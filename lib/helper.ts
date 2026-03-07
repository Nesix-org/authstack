import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function hashPassword (password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword (password:string, hashedPassword:string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}


export async function Session () {
  return await getServerSession(authOptions)
}
