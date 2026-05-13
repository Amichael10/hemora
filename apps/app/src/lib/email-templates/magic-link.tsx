import * as React from 'react'
import { Button, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <BrandLayout 
    preview={`Your sign-in link for ${siteName}`} 
    siteName={siteName}
    eyebrow="Secure Access"
    heading="Ready to Sign In?"
    headerCopy="Tap the button below to securely access your Hemora dashboard."
  >
    <Text style={styles.hello}>Hello,</Text>
    <Text style={styles.text}>
      Tap the button below to securely sign in to {siteName}. This link works once and expires shortly.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Sign in to {siteName}
    </Button>
    <Text style={styles.muted}>
      Didn’t request this? You can safely ignore this email — no changes will be made to your account.
    </Text>
  </BrandLayout>
)

export default MagicLinkEmail