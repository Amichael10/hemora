import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { BrandLayout, brand, styles } from './_brand'

interface ReauthenticationEmailProps {
  siteName?: string
  token: string
}

export const ReauthenticationEmail = ({
  siteName = 'Kindred',
  token,
}: ReauthenticationEmailProps) => (
  <BrandLayout preview="Your verification code" siteName={siteName}>
    <Heading as="h1" style={styles.heading}>Confirm it’s you</Heading>
    <Text style={styles.text}>Use the code below to verify your identity:</Text>
    <Text
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: '32px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        color: brand.teal,
        background: '#ffffff',
        border: `1px solid ${brand.gold}55`,
        borderRadius: '10px',
        padding: '14px 18px',
        textAlign: 'center',
        margin: '4px 0 18px',
      }}
    >
      {token}
    </Text>
    <Text style={styles.muted}>
      This code expires shortly. If you didn’t request it, you can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default ReauthenticationEmail