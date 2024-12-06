import express from 'express'
import { authController } from '~/v1/controllers/auth.controller'
import { validateData } from '~/v1/middleware/validationMiddleware'
import { loginSchema } from '~/v1/schemas/auth.schema'

const router = express.Router()

router.post('/login', validateData(loginSchema), authController.login)

export default router
