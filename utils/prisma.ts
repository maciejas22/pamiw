import { PrismaClient } from '@prisma/client'
import { serverConfig } from '../src/config'

const prisma = new PrismaClient({
  log:
    serverConfig.env === 'development' ? ['query', 'info', 'warn'] : ['error'],
})

export default prisma
