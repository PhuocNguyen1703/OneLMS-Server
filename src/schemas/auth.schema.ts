import { z } from 'zod'
import { ROLE } from '~/constants'

export const RegisterBody = z
  .object({
    first_name: z.string().trim().min(2).max(256),
    last_name: z.string().trim().min(2).max(256),
    email: z.string().trim().email(),
    password: z.string().trim().min(8).max(20),
    role: z.enum(ROLE)
  })
  .strict()

export const LoginBody = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8).max(20)
  })
  .strict()
