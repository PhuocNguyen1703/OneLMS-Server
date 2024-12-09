import { getDB } from '~/config/mongodb'
import { registerBodyType } from '../types/auth.type'

const userCollectionName: string = 'users'

const register = async (data: registerBodyType) => {
  const { email } = data

  try {
    const oldUser = await getDB().collection(userCollectionName).find({ email: email }).toArray()

    if (oldUser?.length >= 1) throw 'User already exists'

    const newUser = await getDB().collection(userCollectionName).insertOne(data)

    return newUser
  } catch (error) {
    console.log(error)
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

export const authModel = { register, login }
