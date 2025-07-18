import { z } from 'zod'
import { ForgotPasswordBody, LoginBody, OTPBody, RegisterBody } from '../schemas/auth.schema'
import { accountSchema } from '~/schemas/account.schema'
import { ObjectId } from 'mongodb'

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>
export type LoginBodyType = z.TypeOf<typeof LoginBody>
export type VerifyBodyType = z.TypeOf<typeof OTPBody>
export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>

export type AccountType = z.TypeOf<typeof accountSchema> & {
  _id: ObjectId
}
