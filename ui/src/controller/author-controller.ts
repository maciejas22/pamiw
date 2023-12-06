import { path } from '../config/paths.ts'
import {
  IAuthor,
  ICreateAuthorInput,
  IDeleteAuthorInput,
  IUpdateAuthorInput,
} from '../model'
import api from '../utils/api'

export const getAuthors = async () => {
  return await api
    .get<IAuthor[]>(`${path.authors.findAll}`)
    .then((response) => response.data)
}

export const getAuthorById = async (id: string) => {
  return await api
    .get<IAuthor>(`${path.authors.getById.replace('$id', id)}`)
    .then((response) => response.data)
}

export const createAuthor = async (author: ICreateAuthorInput) => {
  return await api
    .post<ICreateAuthorInput>(`${path.authors.create}`, author)
    .then((response) => response.data)
}

export const updateAuthor = async (author: IUpdateAuthorInput) => {
  return await api
    .put<IUpdateAuthorInput>(`${path.authors.update}`, author)
    .then((response) => response.data)
}

export const deleteAuthor = async (author: IDeleteAuthorInput) => {
  return await api
    .delete<IDeleteAuthorInput>(`${path.authors.delete}`, {
      data: author,
    })
    .then((response) => response.data)
}
