import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { Route } from '@tanstack/react-router'
import { useForm } from '@mantine/form'
import { createBook } from '../../controller/book-controller.ts'
import { bookRoute } from './index.tsx'
import { getAuthors } from '../../controller/author-controller.ts'
import { Button, Select, Space, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'

const useCreateBookMutation = () => {
  return useMutation({
    mutationFn: createBook,
  })
}

export const bookCreateRoute = new Route({
  getParentRoute: () => bookRoute,
  path: '/create',
  beforeLoad: () => ({
    queryOpts: {
      queryKey: ['authors'],
      queryFn: () => getAuthors(),
    } as const,
  }),
  load: ({ context: { queryClient, queryOpts } }) => {
    return queryClient.ensureQueryData(queryOpts)
  },
  component: ({ useRouteContext }) => {
    const createBookMutation = useCreateBookMutation()
    const { queryOpts } = useRouteContext()
    const authorQuery = useSuspenseQuery({ ...queryOpts, staleTime: 1000 })
    let authors = authorQuery.data

    const form = useForm({
      initialValues: {
        title: '',
        authorId: '',
      },
      validate: {
        title: (value) => (value.trim().length < 2 ? 'Cannot be empty' : null),
        authorId: (value) =>
          value.trim().length < 1 ? 'Cannot be empty' : null,
      },
      transformValues: (values) => ({
        title: values.title.trim(),
        authorId: parseInt(values.authorId, 10),
      }),
    })

    const handleSubmit = async (values: {
      title: string
      authorId: number
    }) => {
      const notificationId = notifications.show({
        title: 'Creating book...',
        message: 'Please wait...',
        loading: true,
      })
      
      createBookMutation.mutate(values, {
        onSuccess: () => {
          notifications.update({
            id: notificationId,
            title: 'Book created',
            message: 'Book was successfully created',
            color: 'green',
            loading: false,
          })
        },
        onError: () => {
          notifications.update({
            id: notificationId,
            title: 'Book not created',
            message: 'Something went wrong',
            color: 'red',
            loading: false,
          })
        },
      })
    }

    return (
      <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
      </>
    )
  },
})
