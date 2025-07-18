import { ZodError } from 'zod'
import { getDB } from '~/config/mongodb'
import { AccountType, RegisterBodyType } from '../types/auth.type'
import { accountSchema } from '~/schemas/account.schema'

const userCollectionName: string = 'users'

const validateSchema = async (data: RegisterBodyType) => {
  try {
    return accountSchema.parse(data)
  } catch (error) {
    throw error as ZodError
  }
}

const findOne = async (filter: Partial<AccountType> | { [key: string]: unknown }) => {
  try {
    const result = await getDB().collection(userCollectionName).findOne(filter)

    return result
  } catch (error) {
    throw error as Error
  }
}

const insertOne = async (registerData: Partial<AccountType>) => {
  try {
    const result = await getDB().collection(userCollectionName).insertOne(registerData)

    return result
  } catch (error) {
    throw error as Error
  }
}

const updateDocumentFields = async (
  filterQuery: Partial<AccountType>,
  setData?: Partial<AccountType>,
  unsetFields?: string[]
) => {
  const updateOperations: { [key: string]: Partial<AccountType> | string[] } = {}

  if (setData && Object.keys(setData).length > 0) {
    updateOperations.$set = setData
  }

  if (unsetFields && unsetFields.length > 0) {
    const unsetObj: { [key: string]: '' } = {}

    for (const field of unsetFields) {
      unsetObj[field] = ''
    }

    updateOperations.$unset = unsetObj
  }

  if (Object.keys(updateOperations).length === 0) return null

  try {
    const result = await getDB().collection(userCollectionName).updateMany(filterQuery, updateOperations)

    return result
  } catch (error) {
    throw error as Error
  }
}

export const authModel = { validateSchema, findOne, insertOne, updateDocumentFields }
