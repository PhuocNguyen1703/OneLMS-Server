import jwt from 'jsonwebtoken'

export interface IPayload {
  _id: string
  email: string
  role: string
}

export const generateToken = async (payload: IPayload, secretKey: string, expiresIn?: string) => {
  const token = jwt.sign(payload, secretKey, { expiresIn })

  return token
}
