import { Response } from 'express'
import envConfig from '~/config/envConfig'
import { authModel } from '~/models/auth.model'
import { loginBodyType, registerBodyType } from '~/types/auth.type'
import { comparePassword, hashPassword } from '~/utils/crypto'
import { AuthError, EntityError, ForbiddenError } from '~/utils/errors'
import { generateToken, IPayload } from '~/utils/generateToken'

const refreshTokens: string[] = []

const register = async (body: registerBodyType) => {
  const { password } = body

  const hashedPassword = hashPassword(password)

  const transformData = { ...body, password: hashedPassword, createdAt: Date.now() }

  try {
    const newUser = await authModel.register(transformData)

    const getNewUer = await authModel.findOneById(newUser.insertedId.toString())

    return { data: { ...getNewUer }, message: 'User register successfully.' }
  } catch (error) {
    throw error as Error
  }
}

const login = async (body: loginBodyType, res: Response) => {
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
        throw new AuthError('Account has not been verified.')
      }

      if (user._destroy) {
        throw new ForbiddenError('Account has been locked.')
      }

      const payload: IPayload = { _id: user._id.toString(), email: user.email, role: user.role }

      const accessToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_ACCESS, '1d')
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

export const authService = { register, login }
