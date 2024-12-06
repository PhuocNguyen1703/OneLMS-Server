import express from 'express'
import { connectDB } from './config/mongodb'
import envConfig from './config/envConfig'

connectDB()
  .then(() => console.log('Connected successfully to mongoDB'))
  .then(() => startServer())
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

const startServer = () => {
  const app = express()

  app.listen(envConfig.PORT || 5000, () => {
    console.log('Server is running')
  })
}
