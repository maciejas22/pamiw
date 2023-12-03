import axios from 'axios'
import { path } from '../config/paths.ts'
import {
  IBook,
  ICreateBookInput,
  IDeleteBookInput,
  IUpdateBookInput,
} from '../model'

const URL = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${
  path.books.prefix
}`

export const getBooks = async () => {
  return await axios
    .get<IBook[]>(`${URL}${path.books.findAll}`)
    .then((response) => response.data)
}

export const getBookById = async (id: string) => {
  return await axios
    .get<IBook>(`${URL}${path.books.getById.replace('$id', id)}`)
    .then((response) => response.data)
}

export const createBook = async (book: ICreateBookInput) => {
  return await axios
    .post<ICreateBookInput>(`${URL}${path.books.create}`, book)
    .then((response) => response.data)
}

export const updateBook = async (book: IUpdateBookInput) => {
  return await axios
    .put<IUpdateBookInput>(`${URL}${path.books.update}`, book)
    .then((response) => response.data)
}

export const deleteBook = async (book: IDeleteBookInput) => {
  return await axios
    .delete<IDeleteBookInput>(`${URL}${path.books.delete}`, { data: book })
    .then((response) => response.data)
}
