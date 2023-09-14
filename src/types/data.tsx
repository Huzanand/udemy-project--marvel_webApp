// interface IComics {
//     name: string
//     resourceURI: string
// }

export interface IChar {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
    comics: {
        name: string
        resourceURI: string
    }[];
}

export interface IComic {
    id: number
    title: string
    description: string
    pageCount?: number | string
    thumbnail: string
    language?: string
    price?: number | string
}

