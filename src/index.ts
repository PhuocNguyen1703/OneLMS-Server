import express from 'express'
import { connectDB } from './config/mongodb'
import envConfig from './config/envConfig'
import authRoute from '~/routers/auth/auth.route'
import cors from 'cors'
import cookieParser from 'cookie-parser'

connectDB()
  .then(() => console.log('Connected successfully to mongoDB'))
  .then(() => startServer())
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

const startServer = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  //Routes
  app.use('/auth', authRoute)

  app.listen(envConfig.PORT || 5000, () => {
    console.log(`Server is running at port ${envConfig.PORT}`)
  })
}
