import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { Env } from './config'
import { authorSchemas } from './modules/author/author.schema'
import authorRoutes from './modules/author/author.route'
import bookRoutes from './modules/book/book.route'
import { bookSchemas } from './modules/book/book.schema'
import { authSchemas } from './modules/auth/auth.schema'

const buildServer = (NODE_ENV: Env) => {
  const server = Fastify({
    logger: NODE_ENV === 'development',
  })

  server.get('/healthcheck', async () => {
    return { status: 'OK' }
  })

  for (const schema of [...authSchemas, ...authorSchemas, ...bookSchemas]) {
    server.addSchema(schema)
  }

  server.register(cors, {})
  server.register(fastifySwagger)
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })

  server.register(authorRoutes, { prefix: '/authors' })
  server.register(bookRoutes, { prefix: '/books' })

  return server
}

export default buildServer
