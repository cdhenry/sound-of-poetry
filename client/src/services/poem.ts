import { IGetRegionsQuery, IMap } from '../interfaces/map';
import {
  IGetPoemsQuery,
  IGetTagsParams,
  IGetTitlesParams,
  IPoem,
  IPoemListItem,
  IPoemStat,
  IPoemTag,
  IPoemWord
} from '../interfaces/poem';
import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared';
import API from './api';

export class PoemService {
    private _baseUrl: string = 'poems/'

    public async getPoems(params: IPaginatedParams, query?: IGetPoemsQuery) {
        params = { ...params, ...query }
        const response = await API.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoemListItem>
    }

    public async getTitles(params: IGetTitlesParams) {
        const response = await API.get(`${this._baseUrl}titles`, { params })
        return response.data as ISelectOption[]
    }

    public async getTags(params?: IGetTagsParams) {
        const response = await API.get(`${this._baseUrl}tags`, { params })
        return response.data as IPoemTag[]
    }

    public async getTagsDropdown() {
        const response = await API.get(`${this._baseUrl}tags/dropdown`)
        return response.data as ISelectOption[]
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

    public async getRegions(query?: IGetRegionsQuery) {
        const params = { ...query }
        const response = await API.get(`${this._baseUrl}regions`, { params })
        return response.data as IMap[]
    }

    public async getPoemStats(id: number) {
        const response = await API.get(`${this._baseUrl}${id}/stats`)
        return response.data as IPoemStat[]
    }
}

export const poemService = new PoemService()
