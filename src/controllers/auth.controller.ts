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
    const result = await authService.login(req.body, res)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error)
  }
}

export const authController = { register, login }
