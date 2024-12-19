import { ZodError } from 'zod'
import { getDB } from '~/config/mongodb'
import { RegisterBodyType } from '../types/auth.type'
import { ObjectId } from 'mongodb'
import { EntityError } from '~/utils/errors'
import { accountSchema } from '~/schemas/account.schema'

const userCollectionName: string = 'users'

const validateSchema = async (data: RegisterBodyType) => {
  try {
    return accountSchema.parse(data)
  } catch (error) {
    throw error as ZodError
  }
}

const findOneById = async (insertedId: string) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .findOne({ _id: new ObjectId(insertedId) })

    return result
  } catch (error) {
    throw error as Error
  }
}

const register = async (data: RegisterBodyType) => {
  const { email } = data

  try {
    const existUser = await getDB().collection(userCollectionName).find({ email: email }).toArray()

    if (existUser?.length >= 1) {
      throw new EntityError([{ field: 'email', message: 'User already exists.' }])
    }

    const validatedData = await validateSchema(data)
    if (!validatedData) {
      throw new EntityError([{ field: 'validate model', message: 'Validated data is invalid.' }])
    }

    const newUser = await getDB().collection(userCollectionName).insertOne(validatedData)

    return newUser
  } catch (error) {
    throw error as Error
  }
}

const login = async (email: string) => {
  try {
    const result = await getDB().collection(userCollectionName).find({ email: email }).toArray()
    return result[0]
  } catch (error) {
    throw error as Error
  }
}

export const authModel = { findOneById, register, login }
