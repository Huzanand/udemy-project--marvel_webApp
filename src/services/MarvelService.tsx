import { useHttp } from "../hooks/http.hook";

import { IChar, 
    IComic 
} from "../types/data";


interface IService {
    loading: boolean;
    error: string | boolean | null;
    getAllCharacters: (offset?: number) => Promise<IChar[]>; 
    getCharacter: (characterId: number) => Promise<IChar>; 
    getCharacterByName: (name: string) => Promise<IChar>; 
    getAllComics: (offset?: number) => Promise<IComic[]>; 
    getComic: (comicId: number) => Promise<IComic>; 
    clearError: () => void;
}

interface ICharData {
    id: number;
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
        url:string
    }[]
    comics: {
      available: number;
      collectionURI: string;
      items: {
        resourceURI: string;
        name: string;
      }[];
      returned: number;
    };
  }

  interface IComicData{
    id: number
    title: string
    description?: string
    pageCount?: number
    thumbnail: {
        path: string
        extension: string
    }
    textObjects:{language?: string}[]
    prices: {
        price: number
    }[]
}

const useMarvelService: () => IService = () => {
    const {
        loading, 
        request, 
        error, 
        clearError
    } = useHttp();

    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=cf00dd4f15fa1298d6d5af85d670c37c';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (characterId: number) => {
        const res = await request(`${_apiBase}characters/${characterId}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name: string) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};
 
    const _transformCharacter: (char: ICharData) => IChar = (char) => {

        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'Description is missing..',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic)
    }

    const getComic = async (comicId: number) => {
        const res = await request(`${_apiBase}comics/${comicId}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }


    const _transformComic: (comic: IComicData) => IComic = (comic) => {
        return {
            id: comic.id,
			title: comic.title,
			description: comic.description || "There is no description",
			pageCount: comic.pageCount
				? `${comic.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
			language: comic.textObjects[0]?.language || "en-us",
			price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "not available",
        }
    }


    return {
            loading, 
            error, 
            getAllCharacters, 
            getCharacter, 
            getCharacterByName, 
            getAllComics, 
            getComic, 
            clearError
        }
}

export default useMarvelService;