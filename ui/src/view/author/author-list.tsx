import { Route } from '@tanstack/react-router'
import { authorRoute } from '.'
import { getAuthors } from '../../controller/author-controller'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Table } from '@mantine/core'

export const authorListRoute = new Route({
  getParentRoute: () => authorRoute,
  path: '/',
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
    const { queryOpts } = useRouteContext()
    const authorQuery = useSuspenseQuery({ ...queryOpts, staleTime: 1000 })
    let authors = authorQuery.data
    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Author</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {authors?.map((author) => (
            <Table.Tr key={author.id}>
              <Table.Td>{author.id}</Table.Td>
              <Table.Td>{author.name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  },
})
