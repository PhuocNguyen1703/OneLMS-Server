import { Request, Response } from 'express'
import { authService } from '../services/auth/auth.service'
import { StatusCodes } from 'http-status-codes'

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    console.log(error)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body)
    res.status(StatusCodes.OK).json({
      data: { ...result },
      message: 'Login successfully'
    })
  } catch (error) {
    console.log(error)
  }
}

export const authController = { register, login }
