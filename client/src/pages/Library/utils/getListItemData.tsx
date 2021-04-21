import { LibraryHeaderFilterEnum } from '../../../enums/filters'
import { IImage } from '../../../interfaces/image'
import { IPoemListItem } from '../../../interfaces/poem'
import { IPoet } from '../../../interfaces/poet'
import { ILibraryListItemType } from '../../../interfaces/shared'
import { ISound } from '../../../interfaces/sound'
import { IWord } from '../../../interfaces/word'
import { ImageService, imageService } from '../../../services/image'
import { PoemService, poemService } from '../../../services/poem'
import { PoetService, poetService } from '../../../services/poet'
import { SoundService, soundService } from '../../../services/sound'
import { WordService, wordService } from '../../../services/word'

export const getListItemData = async (item: ILibraryListItemType, filter: LibraryHeaderFilterEnum): Promise<any> => {
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const _soundService: SoundService = soundService
    const _imageService: ImageService = imageService

    switch (filter) {
        case LibraryHeaderFilterEnum.Poems:
            item = item as IPoemListItem
            console.log(item)
            const poem = await _poemService.getPoem(item.id)
            const wordNetList = await _poemService.getPoemWordNet(item.id)
            return { wordNetList, poem }
        case LibraryHeaderFilterEnum.Poets:
            return await _poetService.getPoet((item as IPoet).id)
        case LibraryHeaderFilterEnum.Words:
            return await _wordService.getWord((item as IWord).wordid)
        case LibraryHeaderFilterEnum.Sounds:
            return await _soundService.getSound((item as ISound).ytid)
        case LibraryHeaderFilterEnum.Images:
            return await _imageService.getImage((item as IImage).wordid)
    }
}
