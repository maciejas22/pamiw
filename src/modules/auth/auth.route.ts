import { FastifyInstance } from 'fastify'
import { $ref } from './auth.schema'
import { registerUserHandler } from './auth.controller'

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/register',
    {
      schema: {
        body: $ref('registerUserSchema'),
        response: {
          200: $ref('registerUserResponseSchema'),
        },
      },
    },
    registerUserHandler,
  )
}

export default authRoutes
