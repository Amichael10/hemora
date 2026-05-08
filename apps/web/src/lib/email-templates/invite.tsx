import * as React from 'react'
import { Button, Heading, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, confirmationUrl }: InviteEmailProps) => (
  <BrandLayout preview={`You’ve been invited to join ${siteName}`} siteName={siteName}>
    <Heading as="h1" style={styles.heading}>You’re invited</Heading>
    <Text style={styles.text}>
      Someone you trust invited you to join {siteName} — a calm space for tracking sickle cell care
      for yourself or a loved one. Accept the invitation to set up your account.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>Accept invitation</Button>
    <Text style={styles.muted}>
      Didn’t expect this invite? You can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default InviteEmail