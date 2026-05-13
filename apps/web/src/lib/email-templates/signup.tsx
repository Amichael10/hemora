import * as React from 'react'
import { Button, Section, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface SignupEmailProps {
  siteName: string
  recipient: string
  confirmationUrl: string
  otpCode: string
}

export const SignupEmail = ({
  siteName,
  recipient,
  confirmationUrl,
  otpCode,
}: SignupEmailProps) => (
  <BrandLayout
    preview={`Confirm your email address for ${siteName}`}
    siteName={siteName}
    eyebrow="Email confirmation"
    heading="Confirm your email address"
    headerCopy="One quick step to keep your Hemora account secure."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      Thanks for joining {siteName}. Please confirm your email address so we can protect your account and make sure important care updates reach you.
    </Text>

    <Section style={styles.otpCard}>
      <Text style={styles.otpLabel}>Your confirmation code</Text>
      <Text style={styles.otpCode}>{otpCode}</Text>
    </Section>

    <Text style={styles.bodyCopy}>
      This code expires in <strong>15 minutes</strong>. If you did not create a {siteName} account, you can safely ignore this email.
    </Text>

    <Button style={styles.button} href={confirmationUrl}>
      Confirm email
    </Button>

    <Text style={{ ...styles.bodyCopy, fontSize: '14px', color: '#6B706D', marginTop: '18px' }}>
      If the button does not work, copy and paste this link into your browser:
    </Text>
    <Text style={{ color: '#9B1E34', fontSize: '14px', wordBreak: 'break-all' }}>
      {confirmationUrl}
    </Text>
  </BrandLayout>
)

export default SignupEmail