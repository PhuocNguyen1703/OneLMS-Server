import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2).max(256),
    lastName: z.string().trim().min(2).max(256),
    email: z.string().trim().email(),
    password: z.string().trim().min(8).max(20)
  })
  .strict()

export const loginSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(20)
  })
  .strict()