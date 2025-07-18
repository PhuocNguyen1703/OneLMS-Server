import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import z from 'zod'

config({
  path: '.env'
})

const checkEnvFile = async () => {
  if (!fs.existsSync(path.resolve('.env'))) {
    console.log('Env file not found!!!!')
    process.exit(1)
  }
}
checkEnvFile()

const configSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGO_DB: z.string(),
  JWT_SECRET_KEY_ACCESS: z.string(),
  JWT_SECRET_KEY_REFRESH: z.string(),
  RESEND_API_KEY: z.string(),
  LOGO_URL: z.string()
})

const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
  console.error(configServer.error.issues)
  throw new Error('The values ​​declared in the .env file are invalid')
}

const envConfig = configServer.data
export default envConfig
