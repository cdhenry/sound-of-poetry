import axios from 'axios';

import { IPoet } from '../interfaces/poet';
import { IPaginatedList, IPaginatedParams } from '../interfaces/shared';

export class PoetService {
    private _baseUrl: string = 'poet/'

    public async getPoets(params: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`)
        return response.data as IPaginatedList<IPoet>
    }

    public async getPoet(params: { id: number }) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPoet
    }
}

export const poetService = new PoetService()
