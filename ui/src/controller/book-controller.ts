import { path } from '../config/paths.ts'
import {
  IBook,
  ICreateBookInput,
  IDeleteBookInput,
  IUpdateBookInput,
} from '../model'
import api from '../utils/api'

export const getBooks = async () => {
  return await api
    .get<IBook[]>(`${path.books.findAll}`)
    .then((response) => response.data)
}

export const getBookById = async (id: string) => {
  return await api
    .get<IBook>(`${path.books.getById.replace('$id', id)}`)
    .then((response) => response.data)
}

export const createBook = async (book: ICreateBookInput) => {
  return await api
    .post<ICreateBookInput>(`${path.books.create}`, book)
    .then((response) => response.data)
}

export const updateBook = async (book: IUpdateBookInput) => {
  return await api
    .put<IUpdateBookInput>(`${path.books.update}`, book)
    .then((response) => response.data)
}

export const deleteBook = async (book: IDeleteBookInput) => {
  return await api
    .delete<IDeleteBookInput>(`${path.books.delete}`, { data: book })
    .then((response) => response.data)
}
