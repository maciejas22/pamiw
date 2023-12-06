import {
  Container,
  Title,
  Text,
  Anchor,
  TextInput,
  PasswordInput,
  Paper,
  Button,
} from '@mantine/core'
import classes from './login.module.css'
import { authRoute } from '.'
import { Route } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../controller/auth-controller'
import { useForm } from '@mantine/form'
import { ILoginUserInput } from '../../model'
import { notifications } from '@mantine/notifications'

const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}

export const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/login',
  component: () => {
    const loginUserMutation = useLoginUser()

    const form = useForm({
      initialValues: {
        username: '',
        password: '',
      },
      validate: {
        username: (value) =>
          value.trim().length < 2 ? 'Cannot be empty' : null,
        password: (value) =>
          value.trim().length < 2 ? 'Cannot be empty' : null,
      },
    })

    const handleSubmit = async (values: ILoginUserInput) => {
      const notificationId = notifications.show({
        title: 'Loggin in...',
        message: 'Please wait...',
        loading: true,
      })

      loginUserMutation.mutate(values, {
        onSuccess: () => {
          notifications.update({
            id: notificationId,
            title: 'Login successful',
            message: 'You are now logged in',
            color: 'green',
            loading: false,
          })
          window.location.href = '/'
        },
        onError: () => {
          notifications.update({
            id: notificationId,
            title: 'Login failed',
            message: 'Something went wrong',
            color: 'red',
            loading: false,
          })
        },
      })
    }

    return (
      <Container size={420} my={40}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title ta='center' className={classes.title}>
            Welcome back!
          </Title>
          <Text c='dimmed' size='sm' ta='center' mt={5}>
            Do not have an account yet?{' '}
            <Anchor size='sm' component='button'>
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
            <TextInput
              label='Username'
              placeholder='Your username'
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              required
              mt='md'
              {...form.getInputProps('password')}
            />
            <Button fullWidth mt='xl' type='submit'>
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    )
  },
})
