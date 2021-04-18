import axios from 'axios';

import { IGetPoetNames, IPoet } from '../interfaces/poet';
import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared';

export class PoetService {
    private _baseUrl: string = 'poets/'

    public async getPoets(params: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoet>
    }

    public async getPoetNames(params: IGetPoetNames) {
        let response = await axios.get(`${this._baseUrl}names`, { params })
        return response.data as ISelectOption[]
    }

    public async getCountPoetsByRegion() {
        let response = await axios.get(`${this._baseUrl}regions/`)
        return response.data
    }

    public async getPoet(id: number) {
        let response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as IPoet
    }
}

export const poetService = new PoetService()
