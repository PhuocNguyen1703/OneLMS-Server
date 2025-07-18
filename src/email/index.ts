import { render } from '@react-email/components'
import { Resend } from 'resend'
import envConfig from '~/config/envConfig'
import { VerifyEmailTemplate } from '~/email/VerifyEmailTemplate'
import { ResetPasswordTemplate } from './ResetPasswordTemplate'

const resend = new Resend(envConfig.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  // const emailHtml = await render(
  //   ResetPasswordTemplate({ userFirstname: 'Mario', resetPasswordLink: 'https://www.dropbox.com' })
  // )

  const emailHtml = await render(VerifyEmailTemplate({ verificationCode }))

  try {
    const { data, error } = await resend.emails.send({
      from: 'OnePlus <oneplus.service@resend.dev>',
      // to: [email],
      to: 'lamphuoc1996@gmail.com',
      subject: 'Verify Email',
      html: emailHtml
    })

    if (error) {
      return console.error({ error })
    }

    console.log({ data })
  } catch (error) {
    console.log(error)
  }
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const emailHtml = await render(
    ResetPasswordTemplate({
      userFirstname: 'Mario',
      resetPasswordLink: `http://localhost:3000/forgot-password/${token}`
    })
  )

  try {
    const { data, error } = await resend.emails.send({
      from: 'OnePlus <oneplus.service@resend.dev>',
      // to: [email],
      to: 'lamphuoc1996@gmail.com',
      subject: 'Reset Password Email',
      html: emailHtml
    })

    if (error) {
      return console.error({ error })
    }

    console.log({ data })
  } catch (error) {
    console.log(error)
  }
}
