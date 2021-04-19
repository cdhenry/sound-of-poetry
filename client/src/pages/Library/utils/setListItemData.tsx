import { LibraryHeaderFilterEnum } from '../../../enums/filters'
import { ImageService, imageService } from '../../../services/image'
import { PoemService, poemService } from '../../../services/poem'
import { PoetService, poetService } from '../../../services/poet'
import { SoundService, soundService } from '../../../services/sound'
import { WordService, wordService } from '../../../services/word'

export const setListItemData = async (id: any, filter: LibraryHeaderFilterEnum) => {
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const _soundService: SoundService = soundService
    const _imageService: ImageService = imageService

    switch (filter) {
        case LibraryHeaderFilterEnum.Poems:
            const poem = await _poemService.getPoem(id)
            const wordNetList = await _poemService.getPoemWordNet(id)
            return { wordNetList, poem }
        case LibraryHeaderFilterEnum.Poets:
            return await _poetService.getPoet(id)
        case LibraryHeaderFilterEnum.Words:
            return await _wordService.getWord(id)
        case LibraryHeaderFilterEnum.Sounds:
            return await _soundService.getSound(id)
        case LibraryHeaderFilterEnum.Images:
            return await _imageService.getImage(id)
    }
}
