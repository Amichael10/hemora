import * as React from 'react'
import { Button, Text, Section, Row, Column } from '@react-email/components'
import { BrandLayout, styles, brand } from './_brand'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <BrandLayout
    preview={`Reset your password for ${siteName}`}
    siteName={siteName}
    eyebrow="Password reset"
    heading="Reset your password"
    headerCopy="Use the secure link below to create a new password."
  >
    <Text style={styles.hello}>Hi there,</Text>
    <Text style={styles.bodyCopy}>
      We received a request to reset the password for your {siteName} account. Click the button below to choose a new password.
    </Text>

    <Button style={styles.button} href={confirmationUrl}>
      Reset password
    </Button>

    <Section style={{ margin: '24px 0' }}>
      <Row>
        <Column style={styles.detailCard}>
          <Text style={styles.detailLabel}>Requested at</Text>
          <Text style={styles.detailValue}>Just now</Text>
        </Column>
        <Column style={{ width: '14px' }} />
        <Column style={styles.detailCard}>
          <Text style={styles.detailLabel}>Link expires</Text>
          <Text style={styles.detailValue}>60 minutes</Text>
        </Column>
      </Row>
    </Section>

    <Text style={styles.bodyCopy}>
      If you did not request this password reset, you can ignore this email. Your current password will stay the same.
    </Text>

    <Text style={{ ...styles.bodyCopy, fontSize: '14px', color: '#6B706D', marginTop: '18px' }}>
      If the button does not work, copy and paste this link into your browser:
    </Text>
    <Text style={{ color: brand.oxblood, fontSize: '14px', wordBreak: 'break-all' }}>
      {confirmationUrl}
    </Text>
  </BrandLayout>
)

export default RecoveryEmail