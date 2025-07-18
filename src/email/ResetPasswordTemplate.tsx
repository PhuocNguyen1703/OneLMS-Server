import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import envConfig from '~/config/envConfig'

interface ResetPasswordTemplateProps {
  userFirstname?: string
  resetPasswordLink?: string
}

export const ResetPasswordTemplate = ({ userFirstname, resetPasswordLink }: ResetPasswordTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>OnePlus reset your password</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Row style={{ width: '100%' }}>
              <Column style={imageSection}>
                <div style={logoContainer}>
                  <Img src={envConfig.LOGO_URL} width='35' height='35' alt='Logo' style={logoImage} />
                  <p style={logoText}>
                    One
                    <span style={gradientText}>Plus</span>
                  </p>
                </div>
              </Column>
            </Row>
            <Section style={upperSection}>
              <Text style={text}>Hi {userFirstname},</Text>
              <Text style={text}>
                Someone recently requested a password change for your OnePlus account. If this was you, you can set a
                new password here:
              </Text>
              <Link style={button} href={resetPasswordLink}>
                Reset password
              </Link>
              <Text style={{ ...text, margin: '12px 0' }}>(This link is valid for 10 minutes)</Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this
                message.
              </Text>
              <Text style={text}>To keep your account secure, please don&apos;t forward this email to anyone.</Text>
              <Text style={{ ...text, margin: 0 }}>Thanks,</Text>
              <Text style={{ ...text, margin: 0 }}>OnePlus Support Team</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#fff',
  color: '#212121'
}

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee'
}

const imageSection = {
  width: '100%',
  padding: '14px 0',
  backgroundColor: '#E0EAFC',
  background: 'linear-gradient(to bottom, #CFDEF3, #E0EAFC)',
  textAlign: 'center' as const
}

const logoContainer = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const logoImage = {
  display: 'block'
}

const coverSection = { backgroundColor: '#fff' }

const upperSection = { padding: '25px 35px' }

const lowerSection = { padding: '25px 35px' }

const text = {
  display: 'block',
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  margin: '24px 0'
}

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '12px 8px'
}

const logoText = {
  ...text,
  fontSize: '24px',
  margin: '0',
  fontWeight: 'bold',
  alignContent: 'center'
}

const gradientText = {
  background: 'linear-gradient(100deg, #40ddff -6.08%, #7612fa 25.08%, #fa12e3)',
  backgroundClip: 'text',
  color: 'transparent'
}
