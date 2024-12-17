import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import envConfig from '~/config/envConfig'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = (req.headers?.authorization as string)?.split(' ')[1]

    const decodedToken = jwt.verify(token, envConfig.JWT_SECRET_KEY_ACCESS)

    if (decodedToken && typeof decodedToken === 'object') {
      req.userId = decodedToken._id as string
      next()
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error, message: 'You are not authenticated' })
  }
}

const verifyTokenUSerAuthorization = (req: Request, res: Response, next: NextFunction) => {}

const verifyTokenAdmin = (req: Request, res: Response, next: NextFunction) => {}

export const authMiddleware = { verifyToken, verifyTokenUSerAuthorization, verifyTokenAdmin }
