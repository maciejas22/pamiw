export interface IAuthor {
    id: number;
    name: string;
}

export interface ICreateAuthorInput {
    name: string;
}

export interface IUpdateAuthorInput {
    id: number;
    name: string;
}

export interface IDeleteAuthorInput {
    id: number;
}