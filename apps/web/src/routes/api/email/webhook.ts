import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { SignupEmail } from '@/lib/email-templates/signup'
import { InviteEmail } from '@/lib/email-templates/invite'
import { RecoveryEmail } from '@/lib/email-templates/recovery'
import { EmailChangeEmail } from '@/lib/email-templates/email-change'
import { ReauthenticationEmail } from '@/lib/email-templates/reauthentication'
import { WelcomeEmail } from '@/lib/email-templates/welcome'

const EMAIL_SUBJECTS: Record<string, string> = {
  signup: 'Confirm your email',
  invite: "You've been invited",
  recovery: 'Reset your password',
  email_change: 'Confirm your new email',
  reauthentication: 'Your verification code',
  welcome: 'Welcome to Hemora',
}

// Template mapping
const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
  signup: SignupEmail,
  invite: InviteEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
  welcome: WelcomeEmail,
}

// Configuration
const SITE_NAME = "Hemora"
const SENDER_DOMAIN = "notify.hemora.xyz"
const ROOT_DOMAIN = "hemora.xyz"
const FROM_DOMAIN = "hemora.xyz"

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

export const Route = createFileRoute("/api/email/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Use a generic secret for webhook verification
        const webhookSecret = process.env.EMAIL_WEBHOOK_SECRET

        if (!webhookSecret) {
          console.error('EMAIL_WEBHOOK_SECRET not configured')
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 }
          )
        }

        // Verify authorization
        const authHeader = request.headers.get('Authorization')
        const signature = request.headers.get('x-supabase-signature')
        
        const isAuthorized = 
          (authHeader && (authHeader === `Bearer ${webhookSecret}` || authHeader === webhookSecret)) ||
          (signature && signature === webhookSecret)

        if (!isAuthorized) {
          console.error('Unauthorized webhook attempt', { 
            received_auth: authHeader ? 'present' : 'missing',
            received_signature: signature ? 'present' : 'missing',
            expected_secret_configured: !!webhookSecret,
            secret_start: webhookSecret ? webhookSecret.substring(0, 8) + '...' : 'none',
            run_id 
          })
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        let payload: any
        try {
          payload = await request.json()
        } catch (error) {
          console.error('Invalid JSON payload', { error })
          return Response.json(
            { error: 'Invalid webhook payload' },
            { status: 400 }
          )
        }

        const run_id = payload.run_id || crypto.randomUUID()
        const emailType = payload.data?.action_type || payload.type

        if (!emailType) {
          console.error('Webhook payload missing action_type', { run_id })
          return Response.json(
            { error: 'Invalid webhook payload: missing action_type' },
            { status: 400 }
          )
        }

        console.log('Received auth event', {
          emailType,
          email_redacted: redactEmail(payload.data?.email),
          run_id,
        })

        const EmailTemplate = EMAIL_TEMPLATES[emailType]
        if (!EmailTemplate) {
          console.error('Unknown email type', { emailType, run_id })
          return Response.json(
            { error: `Unknown email type: ${emailType}` },
            { status: 400 }
          )
        }

        // Build template props from payload.data (Supabase Auth Hook structure)
        const templateProps = {
          siteName: SITE_NAME,
          siteUrl: `https://${ROOT_DOMAIN}`,
          recipient: payload.data.email,
          confirmationUrl: payload.data.url,
          otpCode: payload.data.token,
          email: payload.data.email,
          oldEmail: payload.data.old_email,
          newEmail: payload.data.new_email,
        }

        // Render React Email to HTML and plain text
        const element = React.createElement(EmailTemplate, templateProps)
        const html = await render(element)
        const text = await render(element, { plainText: true })

        // Enqueue email for async processing by the dispatcher (process-email-queue).
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing Supabase environment variables')
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 }
          )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const messageId = crypto.randomUUID()

        // Log pending BEFORE enqueue so we have a record even if enqueue crashes
        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: emailType,
          recipient_email: payload.data.email,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'auth_emails',
          payload: {
            run_id,
            message_id: messageId,
            to: payload.data.email,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: EMAIL_SUBJECTS[emailType] || 'Notification',
            html,
            text,
            purpose: 'transactional',
            label: emailType,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          console.error('Failed to enqueue auth email', { error: enqueueError, run_id, emailType })
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: emailType,
            recipient_email: payload.data.email,
            status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json(
            { error: 'Failed to enqueue email' },
            { status: 500 }
          )
        }

        console.log('Auth email enqueued', {
          emailType,
          email_redacted: redactEmail(payload.data.email),
          run_id,
        })

        return Response.json({ success: true, queued: true })
      },
    },
  },
})

