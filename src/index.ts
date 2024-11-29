import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGO_DB}`)
}

connectDB()
  .then(() => console.log('Connected successfully to mongoDB'))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error)
  })

const bootServer = () => {
  const app = express()

  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running')
  })
}
