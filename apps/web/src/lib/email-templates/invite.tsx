import * as React from 'react'
import { Button, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface InviteEmailProps {
  siteName: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, confirmationUrl }: InviteEmailProps) => (
  <BrandLayout
    preview={`You’ve been invited to join ${siteName}`}
    siteName={siteName}
    eyebrow="Invitation"
    heading="You're invited"
    headerCopy="Join a calm space for tracking sickle cell care."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      Someone you trust invited you to join {siteName} — a community dedicated to better sickle cell care. Accept the invitation to set up your account and start managing your health journey.
    </Text>

    <Button style={styles.button} href={confirmationUrl}>
      Accept invitation
    </Button>

    <Text style={styles.bodyCopy}>
      If you didn't expect this invite, you can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default InviteEmail