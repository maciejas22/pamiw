import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUserInput } from './auth.schema'
import { createUser } from './auth.service'

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: RegisterUserInput
  }>,
  reply: FastifyReply,
) {
  const body = request.body

  try {
    const author = await createUser(body)
    return reply.code(200).send(author)
  } catch (err) {
    return reply.code(500).send(err)
  }
}
