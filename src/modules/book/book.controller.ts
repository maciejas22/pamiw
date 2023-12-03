import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createBook,
  deleteBook,
  findBookById,
  findBooks,
  updateBook,
} from './book.service'
import {
  CreateBookInput,
  DeleteBookInput,
  FindBookParams,
  UpdateBookInput,
} from './book.schema'

export async function getBooksHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const books = await findBooks()
    return reply.code(200).send(books)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function getBookHandler(
  request: FastifyRequest<{ Params: FindBookParams }>,
  reply: FastifyReply,
) {
  const bookId = parseInt(request.params.id, 10)

  try {
    const book = await findBookById(bookId)
    return reply.code(200).send(book)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function createBookHandler(
  request: FastifyRequest<{ Body: CreateBookInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const book = await createBook(body)
    return reply.code(200).send(book)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function updateBookHandler(
  request: FastifyRequest<{ Body: UpdateBookInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const book = await updateBook(body)
    return reply.code(200).send(book)
  } catch (err) {
    return reply.send(500).send(err)
  }
}

export async function deleteBookHandler(
  request: FastifyRequest<{ Body: DeleteBookInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const book = await deleteBook(body)
    return reply.code(200).send(book)
  } catch (err) {
    return reply.send(500).send(err)
  }
}
