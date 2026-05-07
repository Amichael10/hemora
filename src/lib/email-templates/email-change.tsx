import * as React from 'react'
import { Button, Heading, Link, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <BrandLayout preview={`Confirm your new email for ${siteName}`} siteName={siteName}>
    <Heading as="h1" style={styles.heading}>Confirm your new email</Heading>
    <Text style={styles.text}>
      You asked to change the email on your {siteName} account from{' '}
      <Link style={styles.link} href={`mailto:${oldEmail}`}>{oldEmail}</Link> to{' '}
      <Link style={styles.link} href={`mailto:${newEmail}`}>{newEmail}</Link>.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>Confirm new email</Button>
    <Text style={styles.muted}>
      If you didn’t request this change, please secure your account right away.
    </Text>
  </BrandLayout>
)

export default EmailChangeEmail