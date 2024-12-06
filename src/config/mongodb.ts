import { MongoClient } from 'mongodb'
import envConfig from './envConfig'

let dbInstance: unknown = null
const DB_NAME = 'OneLMS_DB'

export const connectDB = async () => {
  const client = new MongoClient(envConfig.MONGO_DB)

  await client.connect()

  dbInstance = client.db(DB_NAME)
}

export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to database first')
  return dbInstance
}
