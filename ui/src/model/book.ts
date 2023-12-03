export interface IBook {
    id: number;
    title: string;
    authorId: number;
    authorName: string;
}

export interface ICreateBookInput {
    title: string;
    authorId: number;
}

export interface IUpdateBookInput {
    id: number;
    title: string;
    authorId: number;
}

export interface IDeleteBookInput {
    id: number;
}