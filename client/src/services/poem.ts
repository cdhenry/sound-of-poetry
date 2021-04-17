import axios from 'axios';

import { IGetPoemsQuery, IPoem, IPoemWord } from '../interfaces/poem';
import { IPaginatedList, IPaginatedParams } from '../interfaces/shared';

export class PoemService {
    private _baseUrl: string = 'poems/'

    public async getPoems(params: IPaginatedParams, query?: IGetPoemsQuery) {
        params = { ...params, ...query }
        const response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoem>
    }

    public async getPoem(id: number) {
        const response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as IPoem
    }

    public async getPoemWords(id: number) {
        const response = await axios.get(`${this._baseUrl}${id}/words`)
        return response.data as IPoemWord[]
    }
}

export const poemService = new PoemService()
