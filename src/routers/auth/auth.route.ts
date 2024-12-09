import express from 'express'
import { authController } from '~/controllers/auth.controller'
import { validateData } from '~/middleware/validationMiddleware'
import { authMiddleware } from '~/middleware/verifyToken'
import { loginSchema, registerSchema } from '~/schemas/auth.schema'

const router = express.Router()

router.post('/register', validateData(registerSchema), authController.register)
router.post('/login', validateData(loginSchema), authController.login)

export default router