import axios from 'axios';

import { IPaginatedList, IPaginatedParams } from '../interfaces/shared';
import { ISound } from '../interfaces/sound';

// Commented text to be added when sound is incorporated
// import FreeSound from 'freesound-client';
// import tokens from '../common/assets/config-tokens';
export class SoundService {
    private _baseUrl: string = 'sound/'
    // private _freeSound = new FreeSound()

    // constructor() {
    //     this._freeSound.setToken(tokens.freesound)
    // }

    public async getSounds(params: IPaginatedParams) {
        let response = await axios.get(`${this._baseUrl}`, { params })
        return response.data as IPaginatedList<ISound>
    }

    public async getSound(id: number) {
        let response = await axios.get(`${this._baseUrl}${id}`)
        return response.data as ISound
    }

    // public async getFreeSound(soundId: number) {
    //     const response = await this._freeSound.getSound(soundId)
    //     return response
    // }
}

export const soundService = new SoundService()
