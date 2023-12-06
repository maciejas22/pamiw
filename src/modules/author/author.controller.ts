import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createAuthor,
  deleteAuthor,
  findAuthorById,
  findAuthors,
  updateAuthor,
} from './author.service'
import {
  CreateAuthorInput,
  DeleteAuthorInput,
  FindAuthorParams,
  UpdateAuthorInput,
} from './author.schema'

export async function getAuthorHandler(
  request: FastifyRequest<{ Params: FindAuthorParams }>,
  reply: FastifyReply,
) {
  const authorId = parseInt(request.params.id, 10)

  try {
    const author = await findAuthorById(authorId)
    return reply.code(200).send(author)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function getAuthorsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const authors = await findAuthors()
    return reply.code(200).send(authors)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function createAuthorHandler(
  request: FastifyRequest<{ Body: CreateAuthorInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const author = await createAuthor(body)
    return reply.code(200).send(author)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function updateAuthorHandler(
  request: FastifyRequest<{ Body: UpdateAuthorInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const author = await updateAuthor(body)
    return reply.code(200).send(author)
  } catch (err) {
    return reply.code(500).send(err)
  }
}

export async function deleteAuthorHandler(
  request: FastifyRequest<{ Body: DeleteAuthorInput }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const author = await deleteAuthor(body)
    return reply.code(200).send(author)
  } catch (err) {
    return reply.code(500).send(err)
  }
}
