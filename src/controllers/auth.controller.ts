import { Request, Response } from 'express'
import { authService } from '../services/auth/auth.service'
import { StatusCodes } from 'http-status-codes'
import { errorTypes } from '~/utils/errors'

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body)

    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body, res)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    if (errorTypes.some((type) => error instanceof type)) {
      const customError = error as { status: number; message: string }
      res.status(customError.status).json({ errors: { message: customError.message, error } })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { message: 'Internal server error.', error } })
    }
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    const result = await authService.logout(req, res)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const authController = { register, login, logout }
