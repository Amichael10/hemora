import * as React from 'react'
import { Button, Heading, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <BrandLayout preview={`Your sign-in link for ${siteName}`} siteName={siteName}>
    <Heading as="h1" style={styles.heading}>Your sign-in link</Heading>
    <Text style={styles.text}>
      Tap the button below to securely sign in to {siteName}. This link works once and expires shortly.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>Sign in to {siteName}</Button>
    <Text style={styles.muted}>
      Didn’t request this? You can safely ignore this email — no changes will be made to your account.
    </Text>
  </BrandLayout>
)

export default MagicLinkEmail