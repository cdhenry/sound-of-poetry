import axios from 'axios';

export class PoemService {
    private _baseUrl: string = 'poem/'

    public async getPoems() {
        let response = await axios.get(`${this._baseUrl}`)
        return response.data
    }

    public async getPoem(id: number) {
        let response = await axios.get(`${this._baseUrl}/${id}`)
        return response.data
    }
}

export const poemService = new PoemService()
