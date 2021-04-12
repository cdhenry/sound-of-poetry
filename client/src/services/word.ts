import axios from 'axios';

import { IPaginatedList, IPaginatedParams } from '../interfaces/shared';
import { IWord } from '../interfaces/word';

export class WordService {
    private _baseUrl: string = 'word/'

    public async getWords(params: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IWord>
    }

    public async getWord(id: number) {
        let response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as IWord
    }
}

export const wordService = new WordService()
