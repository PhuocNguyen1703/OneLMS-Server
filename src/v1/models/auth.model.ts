import { getDB } from '~/config/mongodb'

const authCollectionName: string = 'users'

const login = async (email: string) => {
  try {
    const result = await getDB().collection(authCollectionName).find({ email: email }).toArray()
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const authModel = { login }
