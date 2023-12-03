import {useEffect, useState} from "react";
import {Table} from '@mantine/core';
import {IBook} from "../model";
import {getBooks} from "../controller/book-controller.ts";

export const BookList = () => {
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
        getBooks().then(books => setBooks(books));
    }, []);

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Book</Table.Th>
                    <Table.Th>Author</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {books.map(book => (
                    <Table.Tr key={book.id}>
                        <Table.Td>{book.id}</Table.Td>
                        <Table.Td>{book.title}</Table.Td>
                        <Table.Td>{book.authorName}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};