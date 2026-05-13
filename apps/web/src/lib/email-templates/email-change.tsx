import * as React from 'react'
import { Button, Text, Link } from '@react-email/components'
import { BrandLayout, styles, brand } from './_brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <BrandLayout
    preview={`Confirm your new email for ${siteName}`}
    siteName={siteName}
    eyebrow="Email change"
    heading="Confirm your new email"
    headerCopy="Verify your new email address to complete the change."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      You've requested to change the email address for your {siteName} account from{' '}
      <Link style={styles.footerLink} href={`mailto:${oldEmail}`}>{oldEmail}</Link> to{' '}
      <Link style={styles.footerLink} href={`mailto:${newEmail}`}>{newEmail}</Link>.
    </Text>

    <Button style={styles.button} href={confirmationUrl}>
      Confirm new email
    </Button>

    <Text style={styles.bodyCopy}>
      If you did not request this change, please ignore this email or contact support if you're concerned about your account security.
    </Text>

    <Text style={{ ...styles.bodyCopy, fontSize: '14px', color: '#6B706D', marginTop: '18px' }}>
      If the button does not work, copy and paste this link into your browser:
    </Text>
    <Text style={{ color: brand.oxblood, fontSize: '14px', wordBreak: 'break-all' }}>
      {confirmationUrl}
    </Text>
  </BrandLayout>
)

export default EmailChangeEmail