import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared'
import {
    IGetLemmas,
    IGetWordStats,
    IWord,
    IWordDict,
    IWordImage,
    IWordSound,
    IWordStats,
    IWordSynonym
} from '../interfaces/word'
import API from './api'

export class WordService {
    private _baseUrl: string = 'words/'

    public async getWords(params?: IPaginatedParams) {
        const response = await API.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IWord>
    }

    public async getLemmas(params?: IGetLemmas) {
        const response = await API.get(`${this._baseUrl}lemmas`, { params })
        return response.data as ISelectOption[]
    }

    public async getWord(id: number) {
        const response = await API.get(`${this._baseUrl}${id}`)
        return response.data as IWord
    }

    public async getWordSynonyms(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/synonyms`)
        return response.data as IWordSynonym[]
    }

    public async getWordDict(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/dict`)
        return response.data as IWordDict[]
    }

    public async getWordStats(params: IGetWordStats) {
        const response = await API.get(`${this._baseUrl}${params.id}/stats`, { params })
        return response.data as IWordStats
    }

    public async getWordSounds(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/sounds`)
        return response.data as IWordSound[]
    }

    public async getWordImages(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/images`)
        return response.data as IWordImage[]
    }
}

export const wordService = new WordService()
