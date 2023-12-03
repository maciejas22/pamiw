import prisma from '../../../utils/prisma'
import { RegisterUserInput } from './auth.schema'

export const createUser = async (input: RegisterUserInput) => {
  return prisma.user.create({})
}
