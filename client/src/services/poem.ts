import {
    IGetPoemsQuery,
    IGetTagsParams,
    IGetTitlesParams,
    IPoem,
    IPoemListItem,
    IPoemTag,
    IPoemWord
} from '../interfaces/poem'
import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared'
import API from './api'
import {IMap} from "../interfaces/map";

export class PoemService {
    private _baseUrl: string = 'poems/'

    public async getPoems(params: IPaginatedParams, query?: IGetPoemsQuery) {
        params = { ...params, ...query }
        const response = await API.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoemListItem>
    }

    public async getTitles(params: IGetTitlesParams) {
        const response = await API.get(`${this._baseUrl}titles/`, { params })
        return response.data as ISelectOption[]
    }

    public async getTags(params?: IGetTagsParams) {
        const response = await API.get(`${this._baseUrl}tags`, { params })
        return response.data as ISelectOption[] | IPoemTag[]
    }

    public async getPoem(id: number) {
        const response = await API.get(`${this._baseUrl}${id}`)
        return response.data as IPoem
    }

    public async getPoemWordNet(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/words/wordnet`)
        return response.data as IPoemWord[]
    }

    public async getPoemNonWordNet(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/words/nonwordnet`)
        return response.data as IPoemWord[]
    }

    public async getCountPoemsWithWordByRegion(word: string) {
        const response = await API.get(`${this._baseUrl}words/${word}/regions`)
        return response.data as IMap[]
    }
}

export const poemService = new PoemService()
