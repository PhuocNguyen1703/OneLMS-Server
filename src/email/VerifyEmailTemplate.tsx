import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import envConfig from '~/config/envConfig'

interface VerifyEmailProps {
  verificationCode?: string
}

export const VerifyEmailTemplate = ({ verificationCode }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>OnePlus Email Verification</Preview>
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
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for starting the new OnePlus account creation process. We want to make sure it's really you.
                Please enter the following verification code when prompted. If you don&apos;t want to create an account,
                you can ignore this message.
              </Text>
              <Row style={{ width: '100%' }}>
                <Column align='center'>
                  <div style={verificationSection}>
                    <Text style={verifyText}>Verification code</Text>

                    <Text style={codeText}>{verificationCode}</Text>
                    <Text style={validityText}>(This code is valid for 10 minutes)</Text>
                  </div>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                OnePlus Services will never email you and ask you to disclose or verify your password, credit card, or
                banking account number.
              </Text>
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

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px'
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

const verificationSection = {
  textAlign: 'center' as const,
  width: '100%',
  margin: '20px 0',
  border: '1px solid #4CAF50',
  borderRadius: '5px',
  backgroundColor: '#e8f5e9'
}

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
  width: '100%'
}

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '16px 0',
  textAlign: 'center' as const,
  width: '100%',
  letterSpacing: '1px',
  color: '#4CAF50'
}

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
  width: '100%'
}

const mainText = { ...text, marginBottom: '14px' }

const cautionText = { ...text, margin: '0px' }
