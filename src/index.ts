import express from 'express'
import { connectDB } from './config/mongodb'
import envConfig from './config/envConfig'
import authRoute from '~/routers/auth/auth.route'

connectDB()
  .then(() => console.log('Connected successfully to mongoDB'))
  .then(() => startServer())
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

const startServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  //Routes
  app.use('/v1/auth', authRoute)

  app.listen(envConfig.PORT || 5000, () => {
    console.log(`Server is running at port ${envConfig.PORT}`)
  })
}
