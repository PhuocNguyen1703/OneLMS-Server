import envConfig from '~/config/envConfig'
import { authModel } from '~/v1/models/auth.model'
import { loginBodyType } from '~/v1/types/auth.type'
import { comparePassword } from '~/v1/utils/crypto'
import { generateToken, IPayload } from '~/v1/utils/generateToken'

const login = async (body: loginBodyType) => {
  const { email } = body

  try {
    const user = await authModel.login(email)

    if (!user) {
      throw 'Incorrect email.'
    }

    const validPassword = await comparePassword(body.password, user.password)
    if (!validPassword) {
      throw 'Incorrect password.'
    }

    if (user && validPassword) {
      const payload: IPayload = { _id: user._id.toString(), email: user.email, role: user.role }
      const accessToken = await generateToken(payload, envConfig.JWT_SECRET_KEY_ACCESS, '10s')

      user.accessToken = accessToken
      delete user.password

      return user
    }
  } catch (error) {
    console.log(error)
  }
}

export const authService = { login }
