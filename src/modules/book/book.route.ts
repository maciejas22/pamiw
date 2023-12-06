import { FastifyInstance } from 'fastify'
import { $ref } from './book.schema'
import {
  createBookHandler,
  deleteBookHandler,
  getBookHandler,
  getBooksHandler,
  updateBookHandler,
} from './book.controller'

const bookRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('findBooksResponseSchema'),
        },
      },
    },
    getBooksHandler,
  ),
    server.get(
      '/:id',
      {
        schema: {
          params: $ref('findBookParams'),
          response: {
            200: $ref('findBookResponseSchema'),
          },
        },
      },
      getBookHandler,
    ),
    server.post(
      '/',
      {
        schema: {
          body: $ref('createBookSchema'),
          response: {
            200: $ref('createBookResponseSchema'),
          },
        },
      },
      createBookHandler,
    ),
    server.put(
      '/',
      {
        schema: {
          body: $ref('updateBookSchema'),
          response: {
            200: $ref('updateBookResponseSchema'),
          },
        },
      },
      updateBookHandler,
    ),
    server.delete(
      '/',
      {
        schema: {
          body: $ref('deleteBookSchema'),
          response: {
            200: $ref('deleteBookResponseSchema'),
          },
        },
      },
      deleteBookHandler,
    )
}

export default bookRoutes
