import { Request, Response } from 'express'
import { authService } from '../services/auth/auth.service'
import { loginBodyType } from '../types/auth.type'

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body, res)
    console.log('result', result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

export const authController = { login }
