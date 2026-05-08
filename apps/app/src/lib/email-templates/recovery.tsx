import * as React from 'react'
import { Button, Heading, Text } from '@react-email/components'
import { BrandLayout, styles } from './_brand'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <BrandLayout preview={`Reset your password for ${siteName}`} siteName={siteName}>
    <Heading as="h1" style={styles.heading}>Reset your password</Heading>
    <Text style={styles.text}>
      We received a request to reset your {siteName} password. Choose a new one using the button below.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>Reset password</Button>
    <Text style={styles.muted}>
      If this wasn’t you, you can safely ignore this email — your password stays the same.
    </Text>
  </BrandLayout>
)

export default RecoveryEmail