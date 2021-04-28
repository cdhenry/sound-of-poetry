import { IGetNamesParams, IGetPoetNames, IGetPoetsQuery, IPoet, IPoetTag } from '../interfaces/poet';
import { IPaginatedList, IPaginatedParams, ISelectOption } from '../interfaces/shared';
import API from './api';

export class PoetService {
    private _baseUrl: string = 'poets/'

    public async getPoets(params: IPaginatedParams, query?: IGetPoetsQuery) {
        params = { ...params, ...query }
        let response = await API.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IPoet>
    }

    public async getPoetNames(params: IGetPoetNames, query?: IGetPoetsQuery) {
        params = { ...params, ...query }
        let response = await API.get(`${this._baseUrl}names`, { params })
        return response.data as ISelectOption[]
    }

    public async getCountPoetsByRegion() {
        let response = await API.get(`${this._baseUrl}regions/`)
        return response.data
    }

    public async getPoet(id: number) {
        let response = await API.get(`${this._baseUrl}${id}`)
        return response.data as IPoet
    }

    public async getNames(params?: IGetNamesParams) {
        const response = await API.get(`${this._baseUrl}names`, { params })
        return response.data as ISelectOption[] | IPoetTag[]
    }
}

export const poetService = new PoetService()
