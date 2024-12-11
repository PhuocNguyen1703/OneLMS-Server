import { getDB } from '~/config/mongodb'
import { registerBodyType } from '../types/auth.type'
import { ObjectId } from 'mongodb'

const userCollectionName: string = 'users'

const findOneById = async (insertedId: string) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .findOne({ _id: new ObjectId(insertedId) })

    return result
  } catch (error) {
    throw { error }
  }
}

const register = async (data: registerBodyType) => {
  const { email } = data

  try {
    const existUser = await getDB().collection(userCollectionName).find({ email: email }).toArray()

    if (existUser?.length >= 1) throw 'User already exists'

    const newUser = await getDB().collection(userCollectionName).insertOne(data)

    return newUser
  } catch (error) {
    throw { error }
  }
}

const login = async (email: string) => {
  try {
    const result = await getDB().collection(userCollectionName).find({ email: email }).toArray()
    return result[0]
  } catch (error) {
    throw { error }
  }
}

export const authModel = { findOneById, register, login }
