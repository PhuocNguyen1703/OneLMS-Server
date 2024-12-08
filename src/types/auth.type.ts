import { z } from 'zod'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

export type registerBodyType = z.TypeOf<typeof registerSchema>
export type loginBodyType = z.TypeOf<typeof loginSchema>
