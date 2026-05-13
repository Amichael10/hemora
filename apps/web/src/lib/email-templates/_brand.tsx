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
  Row,
  Column,
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
  bg: '#EFE4D1',
}

// Absolute URLs for assets
export const HEMORA_ICON_URL = 'https://hemora.xyz/brand/logos/hemora-icon.png'
export const HEMORA_LOGO_URL = 'https://hemora.xyz/brand/logos/hemora-logo.png'

const main: React.CSSProperties = {
  backgroundColor: brand.bg,
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '48px 20px',
}

const shell: React.CSSProperties = {
  width: '100%',
  maxWidth: '680px',
  margin: '0 auto',
  backgroundColor: brand.creamLight,
  border: `1px solid ${brand.border}`,
  borderRadius: '32px',
  overflow: 'hidden',
}

const header: React.CSSProperties = {
  background: `linear-gradient(135deg, ${brand.creamLight} 0%, ${brand.cream} 100%)`,
  padding: '36px 44px 28px',
  borderBottom: `1px solid ${brand.border}`,
}

const brandRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '34px',
}

const logoMark: React.CSSProperties = {
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  marginRight: '14px',
}

const brandName: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: '36px',
  color: brand.deepTeal,
  letterSpacing: '-0.02em',
  fontWeight: 500,
  margin: 0,
}

const eyebrow: React.CSSProperties = {
  color: brand.oxblood,
  fontSize: '13px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: '14px',
}

const h1: React.CSSProperties = {
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
  backgroundColor: brand.creamLight,
}

const hello: React.CSSProperties = {
  fontSize: '18px',
  margin: '0 0 14px',
  color: brand.deepTeal,
  fontWeight: 700,
}

const bodyCopy: React.CSSProperties = {
  fontSize: '16px',
  color: brand.ink,
  margin: '0 0 18px',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: brand.oxblood,
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '18px',
  padding: '16px 26px',
  fontWeight: 800,
  fontSize: '16px',
  margin: '30px 0 24px',
}

const secondaryButton: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: brand.deepTeal,
}

const otpCard: React.CSSProperties = {
  backgroundColor: brand.deepTeal,
  color: '#ffffff',
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
}

const detailCard: React.CSSProperties = {
  backgroundColor: brand.creamLight,
  border: `1px solid ${brand.border}`,
  borderRadius: '18px',
  padding: '16px',
}

const detailLabel: React.CSSProperties = {
  display: 'block',
  color: brand.muted,
  fontSize: '13px',
  margin: '0 0 4px',
}

const detailValue: React.CSSProperties = {
  color: brand.deepTeal,
  fontSize: '16px',
  fontWeight: 700,
  margin: 0,
}

const footer: React.CSSProperties = {
  padding: '26px 44px 36px',
  backgroundColor: '#F2E5CF',
  borderTop: `1px solid ${brand.border}`,
  color: brand.muted,
  fontSize: '13px',
}

const footerBrand: React.CSSProperties = {
  color: brand.deepTeal,
  fontWeight: 800,
  marginBottom: '8px',
}

const footerLinks: React.CSSProperties = {
  marginTop: '14px',
}

const footerLink: React.CSSProperties = {
  color: brand.oxblood,
  textDecoration: 'none',
  marginRight: '16px',
  fontWeight: 700,
}

export const styles = {
  main,
  shell,
  header,
  brandRow,
  logoMark,
  brandName,
  eyebrow,
  h1,
  headerCopy,
  body,
  hello,
  bodyCopy,
  button: buttonStyle,
  secondaryButton,
  otpCard,
  otpLabel,
  otpCode,
  detailCard,
  detailLabel,
  detailValue,
  footer,
  footerBrand,
  footerLinks,
  footerLink,
}

interface BrandLayoutProps {
  preview: string
  siteName: string
  eyebrow: string
  heading: string
  headerCopy: string
  children: React.ReactNode
}

export const BrandLayout = ({
  preview,
  siteName,
  eyebrow: eyebrowText,
  heading,
  headerCopy: headerCopyText,
  children,
}: BrandLayoutProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={shell}>
        <Section style={header}>
          <Row style={brandRow}>
            <Column width="54">
              <Img
                src={HEMORA_ICON_URL}
                alt=""
                width="54"
                height="54"
                style={logoMark}
              />
            </Column>
            <Column>
              <Text style={brandName}>{siteName}</Text>
            </Column>
          </Row>
          <Text style={eyebrow}>{eyebrowText}</Text>
          <Heading as="h1" style={h1}>
            {heading}
          </Heading>
          <Text style={headerCopy}>{headerCopyText}</Text>
        </Section>

        <Section style={body}>
          {children}
        </Section>

        <Section style={footer}>
          <Text style={footerBrand}>{siteName}</Text>
          <Text style={{ margin: 0 }}>Built for families. Guided by care.</Text>
          <Section style={footerLinks}>
            <Link href="https://hemora.xyz" style={footerLink}>
              hemora.xyz
            </Link>
            <Link href="https://hemora.xyz/support" style={footerLink}>
              Support
            </Link>
            <Link href="https://hemora.xyz/privacy" style={footerLink}>
              Privacy
            </Link>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
)