import { Route } from '@tanstack/react-router'
import { authorRoute } from './index.tsx'
import {
  getAuthorById,
  updateAuthor,
} from '../../controller/author-controller.ts'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from '@mantine/form'
import { Button, Space, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'

const useUpdateAuthorMutation = () => {
  return useMutation({
    mutationFn: updateAuthor,
  })
}

export const authorUpdateRoute = new Route({
  getParentRoute: () => authorRoute,
  path: '/$authorId',
  beforeLoad: ({ params: { authorId } }) => ({
    queryOpts: {
      queryKey: ['author', authorId],
      queryFn: () => getAuthorById(authorId),
    } as const,
  }),
  load: ({ context: { queryClient, queryOpts } }) => {
    return queryClient.ensureQueryData(queryOpts)
  },
  component: ({ useRouteContext }) => {
    const updateAuthorMutation = useUpdateAuthorMutation()
    const { queryOpts } = useRouteContext()
    const authorQuery = useSuspenseQuery({ ...queryOpts, staleTime: 1000 })
    const author = authorQuery.data

    const form = useForm({
      initialValues: {
        name: author.name,
      },
      validate: {
        name: (value) => (value.trim().length < 2 ? 'Cannot be empty' : null),
      },
    })

    const handleSubmit = async (values: { name: string }) => {
      const notificationId = notifications.show({
        title: 'Updating author...',
        message: 'Please wait...',
        loading: true,
      })

      updateAuthorMutation.mutate(
        { id: author.id, ...values },
        {
          onSuccess: () => {
            notifications.update({
              id: notificationId,
              title: 'Author updated',
              message: 'Author was successfully updated',
              color: 'green',
              loading: false,
            })
          },
          onError: () => {
            notifications.update({
              id: notificationId,
              title: 'Author not updated',
              message: 'Something went wrong',
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
          label='Author name'
          placeholder='Author name'
          {...form.getInputProps('name')}
        />
        <Space h='md' />
        <Button variant='filled' type='submit'>
          Update
        </Button>
      </form>
    )
  },
})
