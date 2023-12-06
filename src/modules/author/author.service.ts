import prisma from '../../../utils/prisma'
import {
  CreateAuthorInput,
  DeleteAuthorInput,
  UpdateAuthorInput,
} from './author.schema'

export const createAuthor = async (input: CreateAuthorInput) => {
  return prisma.author.create({
    data: input,
  })
}

export const findAuthorById = async (id: number) => {
  return prisma.author.findUnique({
    where: {
      id: id,
    },
  })
}

export const findAuthors = async () => {
  return prisma.author.findMany()
}

export const updateAuthor = async (input: UpdateAuthorInput) => {
  return prisma.author.update({
    where: {
      id: input.id,
    },
    data: input,
  })
}

export const deleteAuthor = async (input: DeleteAuthorInput) => {
  return prisma.author.delete({
    where: {
      id: input.id,
    },
  })
}
