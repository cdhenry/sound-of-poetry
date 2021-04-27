import { IImage } from '../interfaces/image'
import { IPaginatedList, IPaginatedParams } from '../interfaces/shared'
import API from './api'

export class ImageService {
    private _baseUrl: string = 'images/'

    public async getImages(params: IPaginatedParams) {
        let response = await API.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<IImage>
    }

    public async getImage(id: number) {
        let response = await API.get(`${this._baseUrl}${id}`)
        return response.data as IImage
    }
}

export const imageService = new ImageService()
