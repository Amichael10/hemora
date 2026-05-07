import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

// Kindred brand tokens (mirrors src/kindred-theme.css)
export const brand = {
  cream: '#f4ead8',
  creamSoft: '#faf3e3',
  teal: '#193b3f', // deep teal heading color
  tealSoft: '#2c5a5f',
  gold: '#c9a35a',
  red: '#a8324a',
  redHover: '#8c2a3d',
  ink: '#2a2a2a',
  muted: '#6b6256',
}

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '32px 16px',
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: brand.cream,
  borderRadius: '14px',
  padding: '40px 36px',
  border: `1px solid ${brand.gold}33`,
}

const wordmark: React.CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontSize: '20px',
  fontWeight: 600,
  color: brand.teal,
  letterSpacing: '-0.01em',
  margin: 0,
}

const goldRule: React.CSSProperties = {
  border: 'none',
  borderTop: `2px solid ${brand.gold}`,
  width: '40px',
  margin: '20px 0 24px',
}

const heading: React.CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontSize: '26px',
  fontWeight: 600,
  color: brand.teal,
  letterSpacing: '-0.01em',
  margin: '0 0 14px',
  lineHeight: 1.2,
}

const text: React.CSSProperties = {
  fontSize: '15px',
  color: brand.ink,
  lineHeight: 1.6,
  margin: '0 0 18px',
}

const muted: React.CSSProperties = {
  fontSize: '13px',
  color: brand.muted,
  lineHeight: 1.6,
  margin: '28px 0 0',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: brand.teal,
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  borderRadius: '10px',
  padding: '14px 26px',
  textDecoration: 'none',
  margin: '6px 0 8px',
}

const link: React.CSSProperties = {
  color: brand.red,
  textDecoration: 'underline',
}

const footerWrap: React.CSSProperties = {
  maxWidth: '560px',
  margin: '20px auto 0',
  padding: '0 8px',
  textAlign: 'center' as const,
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#9a9388',
  lineHeight: 1.5,
  margin: 0,
}

export const styles = {
  main,
  container,
  wordmark,
  goldRule,
  heading,
  text,
  muted,
  button: buttonStyle,
  link,
}

interface BrandLayoutProps {
  preview: string
  siteName: string
  children: React.ReactNode
}

export const BrandLayout = ({ preview, siteName, children }: BrandLayoutProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Heading as="h2" style={wordmark}>
            {siteName}
          </Heading>
          <Hr style={goldRule} />
        </Section>
        {children}
      </Container>
      <Container style={footerWrap}>
        <Text style={footerText}>
          Sent with care by {siteName} — your sickle cell companion.
        </Text>
      </Container>
    </Body>
  </Html>
)