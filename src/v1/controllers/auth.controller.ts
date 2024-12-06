import { Request, Response } from 'express'

const login = (req: Request, res: Response) => {
  // Handle user login logic using validated data from req.body
  res.json({ message: 'User logged in successfully', data: req.body })
}

export const authController = { login }
