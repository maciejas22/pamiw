import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const bookCore = {
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(2, 'Title must be at least 2 character long'),
  authorId: z.number({
    required_error: 'Author ID is required',
    invalid_type_error: 'Author ID must be a number',
  }),
  authorName: z
    .string({
      required_error: 'Author name is required',
      invalid_type_error: 'Author name must be a string',
    })
    .min(2, 'Author name must be at least 2 character long'),
}

const findBookParams = z.object({
  id: z.string(),
})

const findBookResponseSchema = z.object({
  id: z.number(),
  ...bookCore,
})

const findBooksResponseSchema = z.array(
  z.object({
    id: z.number(),
    ...bookCore,
  }),
)

const createBookSchema = z.object({
  title: bookCore.title,
  authorId: bookCore.authorId,
})

const createBookResponseSchema = z.object({
  id: z.number(),
  ...bookCore,
})

const updateBookSchema = z.object({
  id: z.number(),
  title: bookCore.title,
  authorId: bookCore.authorId,
})

const updateBookResponseSchema = z.object({
  id: z.number(),
  ...bookCore,
})

const deleteBookSchema = z.object({
  id: z.number(),
})

const deleteBookResponseSchema = z.object({
  id: z.number(),
  ...bookCore,
})

export type FindBookParams = z.infer<typeof findBookParams>
export type CreateBookInput = z.infer<typeof createBookSchema>
export type UpdateBookInput = z.infer<typeof updateBookSchema>
export type DeleteBookInput = z.infer<typeof deleteBookSchema>

export const { schemas: bookSchemas, $ref } = buildJsonSchemas(
  {
    findBookParams,
    findBookResponseSchema,
    findBooksResponseSchema,
    createBookSchema,
    createBookResponseSchema,
    updateBookSchema,
    updateBookResponseSchema,
    deleteBookSchema,
    deleteBookResponseSchema,
  },
  { $id: 'book' },
)
