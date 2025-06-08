import nodemailer from 'nodemailer'
import envConfig from '~/config/envConfig'
import { generateEmailTemplate } from './generateEmailTemplate'

export const sendEmail = async (options: { to: string; subject: string; verificationCode: string }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: envConfig.EMAIL_USER,
      pass: envConfig.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: envConfig.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: generateEmailTemplate(options.verificationCode)
  }

  await transporter.sendMail(mailOptions)
}
