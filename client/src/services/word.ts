import axios from 'axios';

import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared';
import { IGetLemmas, IWord } from '../interfaces/word';

export class WordService {
    private _baseUrl: string = 'words/'

    public async getWords(params?: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IWord>
    }

    public async getLemmas(params?: IGetLemmas) {
        let response = await axios.get(`${this._baseUrl}lemmas`, { params })
        return response.data as ISelectOption[]
    }

    public async getWord(id: number) {
        let response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as IWord
    }
}

export const wordService = new WordService()
