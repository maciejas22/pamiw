import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const authorCore = {
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, 'Name must be at least 2 character long'),
}

const findAuthorParams = z.object({
  id: z.string(),
})

const findAuthorResponseSchema = z.object({
  id: z.number(),
  ...authorCore,
})

const findAuthorsResponseSchema = z.array(
  z.object({
    id: z.number(),
    ...authorCore,
  }),
)

const createAuthorSchema = z.object({
  ...authorCore,
})

const createAuthorResponseSchema = z.object({
  id: z.number(),
  ...authorCore,
})

const updateAuthorSchema = z.object({
  id: z.number(),
  ...authorCore,
})

const updateAuthorResponseSchema = z.object({
  id: z.number(),
  ...authorCore,
})

const deleteAuthorSchema = z.object({
  id: z.number(),
})

const deleteAuthorResponseSchema = z.object({
  id: z.number(),
  ...authorCore,
})

export type FindAuthorParams = z.infer<typeof findAuthorParams>
export type CreateAuthorInput = z.infer<typeof createAuthorSchema>
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>
export type DeleteAuthorInput = z.infer<typeof deleteAuthorSchema>

export const { schemas: authorSchemas, $ref } = buildJsonSchemas(
  {
    findAuthorParams,
    findAuthorResponseSchema,
    findAuthorsResponseSchema,
    createAuthorSchema,
    createAuthorResponseSchema,
    updateAuthorSchema,
    updateAuthorResponseSchema,
    deleteAuthorSchema,
    deleteAuthorResponseSchema,
  },
  { $id: 'author' },
)
