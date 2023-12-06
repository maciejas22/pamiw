import { Route } from '@tanstack/react-router'
import { layoutRoute } from '../route-tree.tsx'
import { useState } from 'react'
import fib from '../wasm/fib.wasm?init'
import { Button, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export const wasmRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: '/wasm',
  component: () => {
    const [result, setResult] = useState(0)

    const form = useForm({
      initialValues: {
        num: '',
      },
    })

    const handleSubmit = async (values: { num: string }) => {
      const num = parseInt(values.num)
      const result = await fib().then((instance) => instance.exports.fib(num))
      setResult(result)
    }

    return (
      <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <NumberInput
            label='num'
            placeholder='Enter fib number'
            required
            {...form.getInputProps('num')}
          />

          <Button type='submit' variant='outline'>
            Submit
          </Button>
        </form>
        <div>Result: {result}</div>
      </>
    )
  },
})
