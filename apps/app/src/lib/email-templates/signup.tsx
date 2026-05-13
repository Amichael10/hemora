import * as React from 'react'
import { Button, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <BrandLayout 
    preview={`Confirm your email for ${siteName}`} 
    siteName={siteName}
    eyebrow="Care Verification"
    heading="Welcome Home"
    headerCopy="Confirm your email to begin your care journey with us."
  >
    <Text style={styles.hello}>Hello,</Text>
    <Text style={styles.text}>
      Thanks for joining a community built around better care.
      Please confirm <strong>{recipient}</strong> so we can keep your records safe and personal.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Confirm my email
    </Button>
    <Text style={styles.muted}>
      If you didn’t create a {siteName} account, you can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default SignupEmail