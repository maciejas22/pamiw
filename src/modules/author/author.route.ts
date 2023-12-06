import { FastifyInstance } from 'fastify'
import { $ref } from './author.schema'
import {
  createAuthorHandler,
  deleteAuthorHandler,
  getAuthorHandler,
  getAuthorsHandler,
  updateAuthorHandler,
} from './author.controller'

const authorRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('findAuthorsResponseSchema'),
        },
      },
    },
    getAuthorsHandler,
  ),
    server.get(
      '/:id',
      {
        schema: {
          params: $ref('findAuthorParams'),
          response: {
            200: $ref('findAuthorResponseSchema'),
          },
        },
      },
      getAuthorHandler,
    ),
    server.post(
      '/',
      {
        schema: {
          body: $ref('createAuthorSchema'),
          response: {
            200: $ref('createAuthorResponseSchema'),
          },
        },
      },
      createAuthorHandler,
    ),
    server.put(
      '/',
      {
        schema: {
          body: $ref('updateAuthorSchema'),
          response: {
            200: $ref('updateAuthorResponseSchema'),
          },
        },
      },
      updateAuthorHandler,
    ),
    server.delete(
      '/',
      {
        schema: {
          body: $ref('deleteAuthorSchema'),
          response: {
            200: $ref('deleteAuthorResponseSchema'),
          },
        },
      },
      deleteAuthorHandler,
    )
}

export default authorRoutes
