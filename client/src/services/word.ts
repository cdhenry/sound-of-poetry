import axios from 'axios';

import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared';
import { IFreqWord, IGetLemmas, IWord, IVideoWord, IImageWord} from '../interfaces/word';

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

    public async getFreqWord() {
        let response = await axios.get(`${this._baseUrl}frequent`)
        return response.data as IPaginatedList<IFreqWord>
    }

    public async getImageWord() {
        let response = await axios.get(`${this._baseUrl}hasimage`)
        return response.data as IPaginatedList<IGetLemmas>
    }

    public async getVideoWord() {
        let response = await axios.get(`${this._baseUrl}hasyoutube`)
        return response.data as IPaginatedList<IGetLemmas>
    }
    
    public async selectFreqWord() {
        const response = await axios.get(`${this._baseUrl}tags`)
        return response.data as ISelectOption[] | IFreqWord[]
    }

    public async selectImageWord() {
        let response = await axios.get(`${this._baseUrl}hasimage`)
        return response.data as  ISelectOption[] | IImageWord[]
    }

    public async selectVideoWord() {
        let response = await axios.get(`${this._baseUrl}hasyoutube`)
        return response.data as  ISelectOption[] | IVideoWord[]
    }
    
}

export const wordService = new WordService()
