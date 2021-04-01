import axios from 'axios';

export class PoetService {
    private _baseUrl: string = 'poet/'

    public async getPoets() {
        let response = await axios.get(`${this._baseUrl}`)
        return response.data
    }

    public async getPoet(params: { id: number }) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data
    }
}

export const poetService = new PoetService()
