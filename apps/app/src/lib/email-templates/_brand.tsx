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
  Img,
  Link,
} from '@react-email/components'

// Hemora brand tokens
export const brand = {
  cream: '#F7EEDC',
  creamLight: '#FFF8EC',
  deepTeal: '#073F42',
  tealSoft: '#DCEDEA',
  oxblood: '#9B1E34',
  oxbloodDark: '#781528',
  gold: '#C59A45',
  ink: '#132C2E',
  muted: '#6B706D',
  card: '#FFFDF7',
  border: '#E7D9BD',
  success: '#2F7D62',
}

const main: React.CSSProperties = {
  backgroundColor: '#EFE4D1',
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: 0,
  padding: '48px 0',
}

const shell: React.CSSProperties = {
  maxWidth: '680px',
  margin: '0 auto',
  backgroundColor: brand.creamLight,
  borderRadius: '32px',
  overflow: 'hidden',
  border: `1px solid ${brand.border}`,
}

const header: React.CSSProperties = {
  background: `linear-gradient(135deg, ${brand.creamLight} 0%, ${brand.cream} 100%)`,
  padding: '36px 44px 28px',
  borderBottom: `1px solid ${brand.border}`,
}

const brandRow: React.CSSProperties = {
  marginBottom: '34px',
}

const brandLogo: React.CSSProperties = {
  width: '42px',
  height: '42px',
  backgroundColor: brand.oxblood,
  borderRadius: '10px',
  display: 'inline-block',
  verticalAlign: 'middle',
}

const brandName: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: '28px',
  color: brand.deepTeal,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  margin: '0 0 0 14px',
  display: 'inline-block',
  verticalAlign: 'middle',
}

const eyebrow: React.CSSProperties = {
  color: brand.oxblood,
  fontSize: '13px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: '14px',
}

const heading: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: '44px',
  lineHeight: 1.05,
  letterSpacing: '-0.04em',
  color: brand.deepTeal,
  margin: '0 0 16px',
}

const headerCopy: React.CSSProperties = {
  fontSize: '18px',
  color: brand.ink,
  margin: 0,
}

const body: React.CSSProperties = {
  padding: '40px 44px 34px',
}

const hello: React.CSSProperties = {
  fontSize: '18px',
  margin: '0 0 14px',
  color: brand.deepTeal,
  fontWeight: 700,
}

const text: React.CSSProperties = {
  fontSize: '16px',
  color: brand.ink,
  lineHeight: 1.5,
  margin: '0 0 18px',
}

const otpCard: React.CSSProperties = {
  backgroundColor: brand.deepTeal,
  borderRadius: '24px',
  padding: '26px 28px',
  textAlign: 'center' as const,
  margin: '28px 0',
}

const otpLabel: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#E4C37C',
  fontWeight: 700,
  marginBottom: '10px',
}

const otpCode: React.CSSProperties = {
  fontSize: '42px',
  letterSpacing: '0.18em',
  fontWeight: 800,
  color: '#ffffff',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: brand.oxblood,
  color: '#ffffff',
  borderRadius: '18px',
  padding: '16px 26px',
  fontWeight: 800,
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
}

const muted: React.CSSProperties = {
  color: brand.muted,
  fontSize: '14px',
  marginTop: '18px',
  marginBotom: '0',
}

const fallbackLink: React.CSSProperties = {
  wordBreak: 'break-all',
  color: brand.oxblood,
  fontSize: '14px',
  margin: '10px 0 0',
}

const footer: React.CSSProperties = {
  padding: '26px 44px 36px',
  backgroundColor: '#F2E5CF',
  borderTop: `1px solid ${brand.border}`,
}

const footerBrand: React.CSSProperties = {
  color: brand.deepTeal,
  fontWeight: 800,
  marginBottom: '8px',
  fontSize: '13px',
}

const footerText: React.CSSProperties = {
  fontSize: '13px',
  color: brand.muted,
  lineHeight: 1.5,
  margin: 0,
}

const footerLink: React.CSSProperties = {
  color: brand.oxblood,
  textDecoration: 'none',
  marginRight: '16px',
  fontWeight: 700,
  fontSize: '13px',
}

export const styles = {
  main,
  shell,
  header,
  brandRow,
  brandLogo,
  brandName,
  eyebrow,
  heading,
  headerCopy,
  body,
  hello,
  text,
  otpCard,
  otpLabel,
  otpCode,
  button: buttonStyle,
  muted,
  fallbackLink,
  footer,
  footerBrand,
  footerText,
  footerLink,
  link: {
    color: brand.oxblood,
    textDecoration: 'underline',
  },
}

interface BrandLayoutProps {
  preview: string
  siteName: string
  eyebrow?: string
  heading?: string
  headerCopy?: string
  children: React.ReactNode
}

export const BrandLayout = ({ 
  preview, 
  siteName, 
  eyebrow, 
  heading, 
  headerCopy, 
  children 
}: BrandLayoutProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={styles.main}>
      <Container style={styles.shell}>
        <Section style={styles.header}>
          <Section style={styles.brandRow}>
            <Section style={styles.brandLogo} />
            <Text style={styles.brandName}>{siteName}</Text>
          </Section>
          {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
          {heading && <Heading style={styles.heading}>{heading}</Heading>}
          {headerCopy && <Text style={styles.headerCopy}>{headerCopy}</Text>}
        </Section>
        
        <Section style={styles.body}>
          {children}
        </Section>

        <Section style={styles.footer}>
          <Text style={styles.footerBrand}>{siteName}</Text>
          <Text style={styles.footerText}>
            Built for families. Guided by care.
          </Text>
          <Section style={{ marginTop: '14px' }}>
            <Link href="https://hemora.xyz" style={styles.footerLink}>hemora.xyz</Link>
            <Link href="https://hemora.xyz/support" style={styles.footerLink}>Support</Link>
            <Link href="https://hemora.xyz/privacy" style={styles.footerLink}>Privacy</Link>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
)