import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import envConfig from '~/config/envConfig'
import { sendResetPasswordEmail, sendVerificationEmail } from '~/email'
import { authModel } from '~/models/auth.model'
import { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType } from '~/types/auth.type'
import { comparePassword, hashPassword } from '~/utils/crypto'
import { EntityError, ForbiddenError, NotfoundError } from '~/utils/errors'
import { generateToken, IPayload } from '~/utils/generateToken'
import crypto from 'crypto'
import { ObjectId } from 'mongodb'

let refreshTokens: string[] = []

const register = async (body: RegisterBodyType) => {
  const { email, password } = body

  const hashedPassword = hashPassword(password)

  const transformData = { ...body, password: hashedPassword }

  try {
    const existUser = await authModel.findOne({ email })
    if (existUser) throw new EntityError([{ field: 'email', message: 'User already exists.' }])

    const validatedData = await authModel.validateSchema(transformData)
    if (!validatedData) throw new EntityError([{ field: 'validate model', message: 'Validated data is invalid.' }])

    const newUser = await authModel.insertOne(validatedData)
    if (!newUser || !newUser.insertedId) throw new Error('Failed to create new user.')

    const getNewUer = await authModel.findOne({ _id: newUser.insertedId })

    if (getNewUer) {
      delete getNewUer.password
      return { data: { ...getNewUer }, message: 'User register successfully.' }
    } else {
      throw new Error('Failed to retrieve new user after registration.')
    }
  } catch (error) {
    throw error as Error
  }
}

const login = async (body: LoginBodyType, res: Response) => {
  const { email } = body

  try {
    const user = await authModel.findOne({ email })

    if (!user) throw new EntityError([{ field: 'email', message: 'Incorrect email or password.' }])

    if (!body.password || !user.password)
      throw new EntityError([{ field: 'password', message: 'Incorrect email or password.' }])

    const validPassword = comparePassword(body.password, user.password)
    if (!validPassword) throw new EntityError([{ field: 'password', message: 'Incorrect email or password.' }])

    if (user._isDeleted) throw new ForbiddenError('Account has been locked.')

    if (user && validPassword) {
      const { _id, role, isActive } = user

      if (!isActive) {
        const verification_code = Math.floor(100000 + Math.random() * 900000).toString()
        const verification_code_exp = Date.now() + 10 * 60 * 1000
        const setFields = { verification_code, verification_code_exp }

        await authModel.updateDocumentFields({ _id }, setFields)
        // await sendVerificationEmail(email, verification_code)
        return { data: { _id }, message: 'Account is not verified.' }
      }

      const payload: IPayload = {
        _id: _id.toString(),
        email,
        role
      }

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

      return { data: { ...user }, message: 'Login successfully.' }
    }
  } catch (error) {
    throw error as Error
  }
}

const verifyEmail = async (req: Request) => {
  const { id } = req.params
  const { code } = req.body

  try {
    const user = await authModel.findOne({
      _id: new ObjectId(id),
      verification_code: code,
      verification_code_exp: { $gt: Date.now() }
    })

    if (!user) throw new EntityError([{ field: 'unknown', message: 'Invalid or expired verification code.' }])

    const unsetFields = ['verification_code', 'verification_code_exp']
    const setFields = { isActive: true, updateAt: Date.now() }

    await authModel.updateDocumentFields({ _id: new ObjectId(id) }, setFields, unsetFields)

    return { message: 'Email verified successfully' }
  } catch (error) {
    throw error as Error
  }
}

const forgotPassword = async (body: ForgotPasswordBodyType) => {
  const { email } = body

  try {
    const user = await authModel.findOne({
      email
    })

    if (!user) throw new NotfoundError('Email not found.')

    if (user._isDeleted) throw new ForbiddenError('Account has been locked.')

    const reset_password_token = crypto.randomBytes(16).toString('hex')

    await sendResetPasswordEmail(user.email, reset_password_token)

    const reset_password_token_exp = Date.now() + 10 * 60 * 1000
    const setFields = { reset_password_token, reset_password_token_exp }

    await authModel.updateDocumentFields({ email }, setFields)

    return { message: 'Password reset link sent to your email.' }
  } catch (error) {
    throw error as Error
  }
}

const resetPassword = async (req: Request) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const user = await authModel.findOne({
      reset_password_token: token,
      reset_password_token_exp: { $gt: Date.now() }
    })

    if (!user) throw new EntityError([{ field: 'unknown', message: 'Invalid or expired reset token.' }])

    const hashedPassword = hashPassword(password)

    const setFields = { password: hashedPassword, updatedAt: Date.now() }
    const unsetFields = ['reset_password_token', 'reset_password_token_exp']

    await authModel.updateDocumentFields({ _id: user?._id }, setFields, unsetFields)

    return { message: 'Password reset successfully.' }
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

export const authService = { register, login, verifyEmail, forgotPassword, resetPassword, logout }
