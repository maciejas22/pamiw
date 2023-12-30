import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { Env, JWTPayloadType } from './config'
import { authorSchemas } from './modules/author/author.schema'
import authorRoutes from './modules/author/author.route'
import bookRoutes from './modules/book/book.route'
import { bookSchemas } from './modules/book/book.schema'
import { authSchemas } from './modules/auth/auth.schema'
import authRoutes from './modules/auth/auth.route'
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import fastifyJWT from '@fastify/jwt'

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

  server.register(cors, {
    origin: true,
    credentials: true,
  })

  server.register(cookie, {
    secret: process.env.COOKIE_SECRET as string,
    parseOptions: {},
    httpOnly: false,
  } as FastifyCookieOptions)

  server.register(fastifyJWT, {
    secret: process.env.JWT_SECRET as string,
    sign: { algorithm: 'HS256' },
    cookie: {
      cookieName: 'accessToken',
      signed: false,
    },
  })

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

  server.register(authRoutes, { prefix: '/auth' })
  server.register(authorRoutes, { prefix: '/authors' })
  server.register(bookRoutes, { prefix: '/books' })

  // server.addHook('onRequest', async (request, reply) => {
  //   const protectedRoutes = ['/authors', '/books']
  //   const accessToken = request.cookies['accessToken']

  //   if (protectedRoutes.some((route) => request.url.includes(route))) {
  //     if (!accessToken) {
  //       console.log('accessToken', accessToken)
  //       reply.code(401).send({ message: 'Unauthorized' })
  //       return
  //     }

  //     try {
  //       const decodedToken = await request.jwtVerify()

  //       if (!decodedToken) {
  //         console.log('decodedToken', decodedToken)
  //         reply.code(401).send({ message: 'Unauthorized' })
  //       }

  //       const { role } = decodedToken as JWTPayloadType

  //       if (!(role === 'ADMIN') && request.method !== 'GET') {
  //         reply.code(403).send({ message: 'Forbidden' })
  //       }
  //     } catch (err) {
  //       reply.code(401).send({ message: 'Unauthorized' })
  //     }
  //     return
  //   }
  // })

  return server
}

export default buildServer
