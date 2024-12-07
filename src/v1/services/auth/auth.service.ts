import { Response } from 'express'
import { loginBodyType } from '~/v1/types/auth.type'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateAccessToken = (body: loginBodyType) => {
  return jwt.sign(
    {
      email: body.email
    },
    'accessToken',
    { expiresIn: '60s' }
  )
}

const login = async (body: loginBodyType) => {
  const accessToken = generateAccessToken(body)

  const { password, ...others } = body

  return { ...others, accessToken }
}

export const authService = { login }
