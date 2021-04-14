import axios from 'axios';

export class MapService {
    private _baseUrl: string = 'map/'

    public async getData() {
        let response = await axios.get(`${this._baseUrl}`)
        return response.data
    }
}

export const mapService = new MapService()
