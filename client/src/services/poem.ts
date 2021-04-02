import axios from 'axios';

import { IPoem } from '../interfaces/poem';
import { IPaginatedList, IPaginatedParams } from '../interfaces/shared';

export class PoemService {
    private _baseUrl: string = 'poem/'

    public async getPoems(params: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoem>
    }

    public async getPoem(params: { id: number }) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPoem
    }
}

export const poemService = new PoemService()
