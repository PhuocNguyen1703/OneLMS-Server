import { Response } from 'express'
import envConfig from '~/config/envConfig'
import { authModel } from '~/models/auth.model'
import { loginBodyType, registerBodyType } from '~/types/auth.type'
import { comparePassword, hashPassword } from '~/utils/crypto'
import { generateToken, IPayload } from '~/utils/generateToken'

const register = async (body: registerBodyType) => {
  const { password } = body

  const hashedPassword = hashPassword(password)

  const transformData = { ...body, password: hashedPassword }

  try {
    const newUser = await authModel.register(transformData)

    return newUser
  } catch (error) {
    console.log(error)
  }
}

const login = async (body: loginBodyType, res: Response) => {
  const { email } = body

  try {
    const user = await authModel.login(email)

    if (!user) {
      throw 'Incorrect email.'
    }

    const validPassword = comparePassword(body.password, user.password)
    if (!validPassword) {
      throw 'Incorrect password.'
    }

    if (user && validPassword) {
      const payload: IPayload = { _id: user._id.toString(), email: user.email, role: user.role }
      const accessToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_ACCESS, '1d')

      user.accessToken = accessToken
      delete user.password

      return { data: { ...user }, message: 'Login successfully' }
    }
  } catch (error) {
    throw { message: error }
  }
}

export const authService = { register, login }
