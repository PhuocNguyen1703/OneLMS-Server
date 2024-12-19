import express from 'express'
import { authController } from '~/controllers/auth.controller'
import { validateData } from '~/middleware/validation'
import { authMiddleware } from '~/middleware/verifyToken'
import { LoginBody, RegisterBody } from '~/schemas/auth.schema'

const router = express.Router()

router.post('/login', validateData(LoginBody), authController.login)
router.post('/register', validateData(RegisterBody), authController.register)
router.post('/logout', authMiddleware.verifyToken, authController.logout)

export default router
