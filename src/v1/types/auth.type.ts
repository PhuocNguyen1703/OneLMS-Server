import { z } from 'zod'
import { loginSchema } from '../schemas/auth.schema'

export type loginBodyType = z.TypeOf<typeof loginSchema>
