const paths = {
    authors: {
        prefix: '/authors',
        getById: '/$id',
        findAll: '/',
        create: '/',
        update: '/',
        delete: '/',
    },
    books: {
        prefix: '/books',
        getById: '/$id',
        findAll: '/',
        create: '/',
        update: '/',
        delete: '/',
    }
}

type Module = keyof typeof paths;
type IPath = {
    [key in Module]: {
        prefix: string;
        findAll: string;
        getById: string;
        create: string;
        update: string;
        delete: string;
    };
}
export const path: IPath = paths;

