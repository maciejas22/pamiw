import prisma from '../../../utils/prisma'
import {
  CreateBookInput,
  DeleteBookInput,
  UpdateBookInput,
} from './book.schema'

export const createBook = async (input: CreateBookInput) => {
  return prisma.book
    .create({
      data: input,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(({ author, ...book }) => {
      return {
        ...book,
        authorName: author.name,
      }
    })
}

export const findBooks = async () => {
  return prisma.book
    .findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((books) => {
      return books.map(({ author, ...book }) => {
        return {
          ...book,
          authorName: author.name,
        }
      })
    })
}

export const findBookById = async (id: number) => {
  return prisma.book
    .findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((book) => {
      if (!book) {
        return null
      }
      const { author, ...rest } = book
      return {
        ...rest,
        authorName: author.name,
      }
    })
}

export const updateBook = async (input: UpdateBookInput) => {
  return prisma.book
    .update({
      where: {
        id: input.id,
      },
      data: input,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(({ author, ...book }) => {
      return {
        ...book,
        authorName: author.name,
      }
    })
}

export const deleteBook = async (input: DeleteBookInput) => {
  return prisma.book
    .delete({
      where: {
        id: input.id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(({ author, ...book }) => {
      return {
        ...book,
        authorName: author.name,
      }
    })
}
