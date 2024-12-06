import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGO_DB}`)
}

connectDB()
  .then(() => console.log('Connected successfully to mongoDB'))
  .then(() => startServer())
  .catch((error) => {
    console.log(error)
    console.log('Can not connect to mongoDB')
  })

const startServer = () => {
  const app = express()

  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running')
  })
}
