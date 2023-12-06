import 'dotenv/config'
import buildServer from './server'
import { serverConfig } from './config'

const server = buildServer(serverConfig.env)

;(async () => {
  try {
    await server.listen({ port: serverConfig.port, host: '127.0.0.1' })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
