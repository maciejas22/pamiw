import axios from "axios";
import {path} from "../config/paths.ts";
import {IAuthor, ICreateAuthorInput, IDeleteAuthorInput, IUpdateAuthorInput} from "../model";

const URL = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${path.authors.prefix}`

export const getAuthors = async () => {
    return await axios.get<IAuthor[]>(`${URL}${path.authors.findAll}`)
        .then(response => response.data)
}

export const getAuthorById = async (id: string) => {
    return await axios.get<IAuthor>(`${URL}${path.authors.getById.replace('$id', id)}`)
        .then(response => response.data)
}

export const createAuthor = async (author: ICreateAuthorInput) => {
    return await axios.post<ICreateAuthorInput>(`${URL}${path.authors.create}`, author)
        .then(response => response.data)
}

export const updateAuthor = async (author: IUpdateAuthorInput) => {
    return await axios.put<IUpdateAuthorInput>(`${URL}${path.authors.update}`, author)
        .then(response => response.data)
}

export const deleteAuthor = async (author: IDeleteAuthorInput) => {
    return await axios.delete<IDeleteAuthorInput>(`${URL}${path.authors.delete}`, {data: author})
        .then(response => response.data)
}

