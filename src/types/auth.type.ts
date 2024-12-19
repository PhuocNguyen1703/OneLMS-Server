import { z } from 'zod'
import { LoginBody, RegisterBody } from '../schemas/auth.schema'

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>
export type LoginBodyType = z.TypeOf<typeof LoginBody>
