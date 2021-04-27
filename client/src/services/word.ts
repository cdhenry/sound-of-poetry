import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared'
import { IGetLemmas, IGetWordStats, IWord, IWordStats } from '../interfaces/word'
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

    public async getWordStats(params: IGetWordStats) {
        const response = await API.get(`${this._baseUrl}${params.id}/stats`, { params })
        return response.data as IWordStats
    }
}

export const wordService = new WordService()
