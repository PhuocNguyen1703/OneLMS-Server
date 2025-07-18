import { z } from 'zod'
import { GENDER, ROLE } from '~/constants'

export const accountSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
  first_name: z.string().trim().min(2).max(256),
  last_name: z.string().trim().min(2).max(256),
  role: z.enum(ROLE),
  avatar: z.string().nullable().default(null),
  birth: z.date().nullable().default(null),
  gender: z.enum(GENDER).nullable().default(null),
  phone: z.number().nullable().default(null),
  address: z
    .object({
      add1: z.string().min(2).max(256),
      add2: z.string().min(2).max(256)
    })
    .nullable()
    .default(null),
  isActive: z.boolean().default(false),
  verification_code: z.string().optional(),
  verification_code_exp: z.number().optional(),
  reset_password_token: z.string().optional(),
  reset_password_token_exp: z.number().optional(),
  last_login: z.number().nullable().default(null),
  createdAt: z.number().default(Date.now()),
  updatedAt: z.number().nullable().default(null),
  _isDeleted: z.boolean().default(false)
})
