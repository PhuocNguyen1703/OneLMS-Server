import { z } from 'zod'
import { GENDER, ROLE } from '~/constants'

export const accountSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
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
  verify: z
    .object({
      status: z.boolean().default(false),
      code: z.number().nullable().default(null),
      expired: z.date().nullable().default(null)
    })
    .default({ status: false, code: null, expired: null }),
  createdAt: z.number(),
  updatedAt: z.number().nullable().default(null),
  _destroy: z.boolean().default(false)
})
