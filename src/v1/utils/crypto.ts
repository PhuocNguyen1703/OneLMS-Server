import bcrypt from 'bcrypt'

export const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash)
