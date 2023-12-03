import { Route } from '@tanstack/react-router'
import { bookRoute } from '.'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Table } from '@mantine/core'
import { getBooks } from '../../controller/book-controller.ts'

export const bookListRoute = new Route({
  getParentRoute: () => bookRoute,
  path: '/',
  beforeLoad: () => ({
    queryOpts: {
      queryKey: ['books'],
      queryFn: () => getBooks(),
    } as const,
  }),
  load: ({ context: { queryClient, queryOpts } }) => {
    return queryClient.ensureQueryData(queryOpts)
  },
  component: ({ useRouteContext }) => {
    const { queryOpts } = useRouteContext()
    const authorQuery = useSuspenseQuery({ ...queryOpts, staleTime: 1000 })
    const books = authorQuery.data

    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Author Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {books.map((book) => (
            <Table.Tr key={book.id}>
              <Table.Td>{book.id}</Table.Td>
              <Table.Td>{book.title}</Table.Td>
              <Table.Td>{book.authorName}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  },
})
