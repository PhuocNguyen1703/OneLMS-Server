import { Response } from 'express'
import envConfig from '~/config/envConfig'
import { authModel } from '~/models/auth.model'
import { loginBodyType, registerBodyType } from '~/types/auth.type'
import { comparePassword, hashPassword } from '~/utils/crypto'
import { EntityError } from '~/utils/errors'
import { generateToken, IPayload } from '~/utils/generateToken'

const optionUserSchemas = {
  lastLogin: null,
  isVerified: false,
  createdAt: Date.now(),
  updatedAt: null,
  _destroy: false
}

const register = async (body: registerBodyType) => {
  const { password } = body

  const hashedPassword = hashPassword(password)

  const transformData = { ...body, password: hashedPassword, ...optionUserSchemas }

  try {
    const newUser = await authModel.register(transformData)
    const getNewUer = await authModel.findOneById(newUser.insertedId.toString())

    return { data: { ...getNewUer }, message: 'User register successfully.' }
  } catch (error) {
    throw { error }
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
      const payload: IPayload = { _id: user._id.toString(), email: user.email, role: user.role }

      const accessToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_ACCESS, '1d')
      const refreshToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_REFRESH, '365d')
      // refreshTokens.push(refreshToken)

      // res.cookie('refreshToken', refreshToken, {
      //   httpOnly: true,
      //   secure: false,
      //   path: '/',
      //   sameSite: 'none'
      // })

      user.accessToken = accessToken
      delete user.password

      return { data: { ...user }, message: 'Login successfully' }
    }
  } catch (error) {
    throw { error }
  }
}

export const authService = { register, login }
