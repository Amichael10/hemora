import * as React from 'react'
import { Button, Section, Text, Row, Column } from '@react-email/components'
import { BrandLayout, styles, brand } from './_brand'

interface WelcomeEmailProps {
  siteName: string
  siteUrl: string
}

export const WelcomeEmail = ({
  siteName,
  siteUrl,
}: WelcomeEmailProps) => (
  <BrandLayout
    preview={`Welcome to ${siteName} — your account is ready`}
    siteName={siteName}
    eyebrow="Account created"
    heading="Your care companion is ready."
    headerCopy="You're now part of a community built for better sickle cell care."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      Welcome to Hemora. We're here to help you manage your health journey with clarity and confidence. Here is how you can get started:
    </Text>

    <Section style={{ margin: '32px 0' }}>
      <Row style={{ marginBottom: '16px' }}>
        <Column width="40" style={{ verticalAlign: 'top' }}>
          <Text style={{ fontSize: '24px', margin: 0 }}>💊</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: '16px', fontWeight: 700, color: brand.deepTeal, margin: '0 0 4px' }}>Track Medications</Text>
          <Text style={{ fontSize: '14px', color: brand.ink, margin: 0 }}>Never miss a dose with our intuitive reminder system.</Text>
        </Column>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Column width="40" style={{ verticalAlign: 'top' }}>
          <Text style={{ fontSize: '24px', margin: 0 }}>📝</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: '16px', fontWeight: 700, color: brand.deepTeal, margin: '0 0 4px' }}>Log Crisis Events</Text>
          <Text style={{ fontSize: '14px', color: brand.ink, margin: 0 }}>Document pain levels and triggers to share with your care team.</Text>
        </Column>
      </Row>
      <Row>
        <Column width="40" style={{ verticalAlign: 'top' }}>
          <Text style={{ fontSize: '24px', margin: 0 }}>🏥</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: '16px', fontWeight: 700, color: brand.deepTeal, margin: '0 0 4px' }}>Manage Records</Text>
          <Text style={{ fontSize: '14px', color: brand.ink, margin: 0 }}>Keep your lab results and medical history in one secure place.</Text>
        </Column>
      </Row>
    </Section>

    <Button style={styles.button} href={siteUrl}>
      Go to Dashboard
    </Button>

    <Text style={styles.bodyCopy}>
      If you have any questions, our support team is just an email away. We're honored to be part of your care team.
    </Text>
  </BrandLayout>
)

export default WelcomeEmail
