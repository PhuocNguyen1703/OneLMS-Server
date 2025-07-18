import { Request, Response } from 'express'
import { authService } from '../services/auth/auth.service'
import { StatusCodes } from 'http-status-codes'
import { handleControllerError } from '~/utils/handleControllerError'

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body)

    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    handleControllerError(res, error)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body, res)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    handleControllerError(res, error)
  }
}

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const result = await authService.verifyEmail(req)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    handleControllerError(res, error)
  }
}

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const result = await authService.forgotPassword(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    handleControllerError(res, error)
  }
}

const resetPassword = async (req: Request, res: Response) => {
  try {
    const result = await authService.resetPassword(req)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    handleControllerError(res, error)
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    const result = await authService.logout(req, res)
    return result
  } catch (error) {
    handleControllerError(res, error)
  }
}

export const authController = { register, login, verifyEmail, forgotPassword, resetPassword, logout }
