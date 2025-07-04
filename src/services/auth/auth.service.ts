import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import envConfig from '~/config/envConfig'
import { authModel } from '~/models/auth.model'
import { LoginBodyType, RegisterBodyType } from '~/types/auth.type'
import { comparePassword, hashPassword } from '~/utils/crypto'
import { AuthError, EntityError, ForbiddenError } from '~/utils/errors'
import { generateToken, IPayload } from '~/utils/generateToken'

let refreshTokens: string[] = []

const register = async (body: RegisterBodyType) => {
  const { password } = body

  const hashedPassword = hashPassword(password as string)

  const transformData = { ...body, password: hashedPassword, createdAt: Date.now() }

  try {
    const newUser = await authModel.register(transformData)

    const getNewUer = await authModel.findOneById(newUser.insertedId.toString())

    return { data: { ...getNewUer }, message: 'User register successfully.' }
  } catch (error) {
    throw error as Error
  }
}

const login = async (body: LoginBodyType, res: Response) => {
  const { email } = body

  try {
    const user = await authModel.login(email)

    if (!user) {
      throw new EntityError([{ field: 'email', message: 'Incorrect email.' }])
    }

    const validPassword = comparePassword(body.password, user.password)
    if (!validPassword) {
      throw new EntityError([{ field: 'password', message: 'Incorrect email or password.' }])
    }

    if (user && validPassword) {
      if (!user.verify?.status) {
        return { data: { _id: user._id, verify: user.verify }, message: 'Account is not verified.' }
      }

      if (user._destroy) {
        throw new ForbiddenError('Account has been locked.')
      }

      const payload: IPayload = { _id: user._id.toString(), email: user.email, role: user.role }

      const accessToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_ACCESS, '10s')
      const refreshToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_REFRESH, '365d')
      refreshTokens.push(refreshToken)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'none'
      })

      user.accessToken = accessToken
      delete user.password

      return { data: { ...user }, message: 'Login successfully' }
    }
  } catch (error) {
    throw error as Error
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== req?.cookies?.refreshToken)
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json('Logged out successfully.')
  } catch (error) {
    throw error as Error
  }
}

export const authService = { register, login, logout }
