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
import { Webhook } from 'standardwebhooks'

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

        const run_id = crypto.randomUUID()
        const headers = Object.fromEntries(request.headers)
        const bodyText = await request.text()

        console.log('Webhook request received', { 
          headerNames: Object.keys(headers),
          method: request.method,
          run_id 
        })

        let payload: any
        let isAuthorized = false

        // 1. Try Standard Webhook verification (Svix style)
        if (webhookSecret.startsWith('v1,whsec_')) {
          try {
            const wh = new Webhook(webhookSecret.replace('v1,whsec_', ''))
            // wh.verify returns the parsed object if successful
            payload = wh.verify(bodyText, headers)
            isAuthorized = true
            console.log('Standard Webhook signature verified', { run_id })
          } catch (err) {
            console.error('Standard Webhook verification failed', { error: err instanceof Error ? err.message : String(err), run_id })
          }
        }

        // 2. Fallback to simple Bearer/Static token if Standard verification failed or wasn't used
        if (!isAuthorized) {
          const authHeader = request.headers.get('Authorization')?.replace('Bearer ', '').trim()
          const supabaseSig = request.headers.get('x-supabase-signature')?.trim()
          
          if ((authHeader && authHeader === webhookSecret.trim()) || (supabaseSig && supabaseSig === webhookSecret.trim())) {
            isAuthorized = true
            try {
              payload = JSON.parse(bodyText)
            } catch (err) {
              console.error('Invalid JSON payload', { error: err, run_id })
              return Response.json({ error: 'Invalid JSON' }, { status: 400 })
            }
          }
        }

        if (!isAuthorized) {
          console.error('Unauthorized webhook attempt', { 
            run_id 
          })
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // At this point, payload is already parsed
        const emailData = payload.email_data || payload.data || {}
        const userData = payload.user || {}
        
        const emailType = emailData.email_action_type || emailData.action_type || payload.type

        if (!emailType) {
          console.error('Webhook payload missing email_action_type', { run_id, payload_keys: Object.keys(payload) })
          return Response.json(
            { error: 'Invalid webhook payload: missing action_type' },
            { status: 400 }
          )
        }

        const recipientEmail = userData.email || emailData.email || payload.email
        
        console.log('Received auth event', {
          emailType,
          email_redacted: redactEmail(recipientEmail),
          run_id,
        })

        const EmailTemplate = EMAIL_TEMPLATES[emailType] || EMAIL_TEMPLATES['signup'] // Fallback to signup if unknown
        if (!EmailTemplate) {
          console.error('Unknown email type', { emailType, run_id })
          return Response.json(
            { error: `Unknown email type: ${emailType}` },
            { status: 400 }
          )
        }

        // Build template props from payload.data (Supabase Auth Hook structure)
        // Construct the confirmation URL with token_hash and type
        let confirmationUrl = emailData.url || emailData.redirect_to || `https://app.${ROOT_DOMAIN}/auth/callback`
        if (!confirmationUrl.includes('token_hash=')) {
          try {
            const url = new URL(confirmationUrl)
            const tokenHash = emailData.token_hash || emailData.token_hash_new
            if (tokenHash) {
              url.searchParams.set('token_hash', tokenHash)
              url.searchParams.set('type', emailType || 'signup')
              confirmationUrl = url.toString()
            }
          } catch (e) {
            console.warn('Could not parse confirmation URL as object', { confirmationUrl, run_id })
          }
        }

        const templateProps = {
          siteName: SITE_NAME,
          siteUrl: `https://${ROOT_DOMAIN}`,
          recipient: recipientEmail,
          confirmationUrl,
          otpCode: emailData.token || emailData.token_new || emailData.token_hash,
          email: recipientEmail,
          oldEmail: emailData.old_email,
          newEmail: emailData.new_email,
        }

        // Render React Email to HTML and plain text
        const element = React.createElement(EmailTemplate, templateProps)
        const html = await render(element)
        const text = await render(element, { plainText: true })

        // Enqueue email for async processing by the dispatcher (process-email-queue).
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing Supabase environment variables', {
            has_url: !!supabaseUrl,
            has_key: !!supabaseServiceKey,
            run_id
          })
          return Response.json(
            { error: 'Server configuration error: missing database credentials' },
            { status: 500 }
          )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const messageId = crypto.randomUUID()

        // Log pending BEFORE enqueue so we have a record even if enqueue crashes
        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: emailType,
          recipient_email: recipientEmail,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'auth_emails',
          payload: {
            run_id,
            message_id: messageId,
            to: recipientEmail,
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
            recipient_email: recipientEmail,
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
          email_redacted: redactEmail(recipientEmail),
          run_id,
        })

        return Response.json({ success: true, queued: true })
      },
    },
  },
})

