import axios from 'axios'

import { IGetPoemsQuery, IGetTagsParams, IGetTitlesParams, IPoem, IPoemTag, IPoemWord } from '../interfaces/poem'
import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared'

export class PoemService {
    private _baseUrl: string = 'poems/'

    public async getPoems(params: IPaginatedParams, query?: IGetPoemsQuery) {
        params = { ...params, ...query }
        const response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoem>
    }

    public async getTitles(params: IGetTitlesParams) {
        const response = await axios.get(`${this._baseUrl}titles/`, { params })
        return response.data as ISelectOption[]
    }

    public async getTags(params?: IGetTagsParams) {
        const response = await axios.get(`${this._baseUrl}tags`, { params })
        return response.data as ISelectOption[] | IPoemTag[]
    }

    public async getPoem(id: number) {
        const response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as IPoem
    }

    public async getPoemWordNet(id: number) {
        const response = await axios.get(`${this._baseUrl}${id}/words/wordnet`)
        return response.data as IPoemWord[]
    }

    public async getPoemNonWordNet(id: number) {
        const response = await axios.get(`${this._baseUrl}${id}/words/nonwordnet`)
        return response.data as IPoemWord[]
    }
}

export const poemService = new PoemService()
