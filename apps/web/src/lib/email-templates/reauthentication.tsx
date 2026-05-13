import * as React from 'react'
import { Section, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface ReauthenticationEmailProps {
  siteName: string
  otpCode: string
}

export const ReauthenticationEmail = ({
  siteName,
  otpCode,
}: ReauthenticationEmailProps) => (
  <BrandLayout
    preview="Your verification code"
    siteName={siteName}
    eyebrow="Security check"
    heading="Confirm it’s you"
    headerCopy="Use the secure code below to verify your identity."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      To keep your account secure, we need to verify your identity. Please use the verification code below to continue.
    </Text>

    <Section style={styles.otpCard}>
      <Text style={styles.otpLabel}>Your verification code</Text>
      <Text style={styles.otpCode}>{otpCode}</Text>
    </Section>

    <Text style={styles.bodyCopy}>
      This code expires shortly. If you didn’t request this verification, please contact our support team immediately.
    </Text>
  </BrandLayout>
)

export default ReauthenticationEmail