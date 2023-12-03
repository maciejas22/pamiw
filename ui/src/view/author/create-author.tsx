import { useForm } from '@mantine/form'
import { Button, TextInput } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { Route } from '@tanstack/react-router'
import { createAuthor } from '../../controller/author-controller.ts'
import { authorRoute } from './index.tsx'
import { ICreateAuthorInput } from '../../model'

const useCreateAuthorMutation = () => {
  return useMutation({
    mutationFn: createAuthor,
  })
}

export const authorCreateRoute = new Route({
  getParentRoute: () => authorRoute,
  path: '/create',
  component: () => {
    const createAuthorMutation = useCreateAuthorMutation()

    const form = useForm({
      initialValues: {
        name: '',
      },
      validate: {
        name: (value) => (value.trim().length < 2 ? 'Cannot be empty' : null),
      },
    })

    const handleSubmit = async (values: ICreateAuthorInput) => {
      const notificationId = notifications.show({
        title: 'Creating author...',
        message: 'Please wait...',
        loading: true,
      })

      createAuthorMutation.mutate(values, {
        onSuccess: () => {
          notifications.update({
            id: notificationId,
            title: 'Author created',
            message: 'Author was successfully created',
            color: 'green',
            loading: false,
          })
        },
        onError: () => {
          notifications.update({
            id: notificationId,
            title: 'Author not created',
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
            label='Name'
            placeholder='Enter your name'
            required
            {...form.getInputProps('name')}
          />

          <Button type='submit' variant='outline'>
            Submit
          </Button>
        </form>
      </>
    )
  },
})
