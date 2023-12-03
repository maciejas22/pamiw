import { Route } from '@tanstack/react-router'
import { bookRoute } from './index.tsx'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getBookById, updateBook } from '../../controller/book-controller.ts'
import { getAuthors } from '../../controller/author-controller.ts'
import { Button, Select, Space, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

const useUpdateBookMutation = () => {
  return useMutation({
    mutationFn: updateBook,
  })
}

export const bookUpdateRoute = new Route({
  getParentRoute: () => bookRoute,
  path: '/$bookId',
  beforeLoad: ({ params: { bookId } }) => ({
    queryOpts: {
      bookQuery: {
        queryKey: ['book', bookId],
        queryFn: () => getBookById(bookId),
      },
      authorsQuery: {
        queryKey: ['authors'],
        queryFn: () => getAuthors(),
      },
    },
  }),
  load: ({ context: { queryClient, queryOpts } }) => {
    return {
      bookQuery: queryClient.ensureQueryData(queryOpts.bookQuery),
      authorsQuery: queryClient.ensureQueryData(queryOpts.authorsQuery),
    }
  },
  component: ({ useRouteContext }) => {
    const updateBookMutation = useUpdateBookMutation()
    const { queryOpts } = useRouteContext()
    const book = useSuspenseQuery(queryOpts.bookQuery).data
    const authors = useSuspenseQuery(queryOpts.authorsQuery).data

    const form = useForm({
      initialValues: {
        title: book.title,
        authorId: book.authorId.toString(),
      },
      validate: {
        title: (value) => (value.trim().length < 2 ? 'Cannot be empty' : null),
        authorId: (value) =>
          value.trim().length < 1 ? 'Cannot be empty' : null,
      },
    })

    const handleSubmit = async (values: {
      title: string
      authorId: string
    }) => {
      const notificationId = notifications.show({
        title: 'Updating book...',
        message: 'Please wait...',
        loading: true,
      })

      updateBookMutation.mutate(
        {
          id: book.id,
          title: values.title,
          authorId: parseInt(values.authorId),
        },
        {
          onSuccess: () => {
            notifications.update({
              id: notificationId,
              title: 'Book updated',
              message: 'Book was successfully updated',
              color: 'green',
              loading: false,
            })
          },
          onError: (error) => {
            notifications.update({
              id: notificationId,
              title: 'Book update failed',
              message: error.message,
              color: 'red',
              loading: false,
            })
          },
        },
      )
    }

    return (
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label='Book Title'
          placeholder='Book Title'
          {...form.getInputProps('title')}
        />
        <Space h='md' />
        <Select
          label='Author'
          placeholder='Select author'
          data={authors.map((author) => {
            return { value: author.id.toString(), label: author.name }
          })}
          searchable
          {...form.getInputProps('authorId')}
        />
        <Space h='md' />
        <Button variant='filled' type='submit'>
          Create
        </Button>
      </form>
    )
  },
})
