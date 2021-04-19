import { LibraryHeaderFilterEnum } from '../../../enums/filters'
import { IGetPoemsQuery, IPoem, IPoemTag } from '../../../interfaces/poem'
import { ILibraryListItemType } from '../../../interfaces/shared'
import { ImageService, imageService } from '../../../services/image'
import { PoemService, poemService } from '../../../services/poem'
import { PoetService, poetService } from '../../../services/poet'
import { SoundService, soundService } from '../../../services/sound'
import { WordService, wordService } from '../../../services/word'

export const setListData = async (
    limit: number,
    pageNumber: number,
    headerFilter: LibraryHeaderFilterEnum,
    selectedOptions?: IGetPoemsQuery
) => {
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const _soundService: SoundService = soundService
    const _imageService: ImageService = imageService

    let data: { total: number; items: ILibraryListItemType[] }

    switch (headerFilter) {
        case LibraryHeaderFilterEnum.Poems:
            data = await _poemService.getPoems({ limit, pageNumber }, selectedOptions)

            const tags = (await _poemService.getTags({
                poemIds: data.items.map((item) => (item as IPoem).id)
            })) as IPoemTag[]

            data.items.forEach(
                (item) =>
                    ((item as IPoem).tags = tags
                        .filter((tag) => tag.poem_id === (item as IPoem).id)
                        .map((tag) => tag.name))
            )

            return data
        case LibraryHeaderFilterEnum.Poets:
            data = await _poetService.getPoets({ limit, pageNumber })
            return data
        case LibraryHeaderFilterEnum.Words:
            data = await _wordService.getWords({ limit, pageNumber })
            return data
        case LibraryHeaderFilterEnum.Sounds:
            data = await _soundService.getSounds({ limit, pageNumber })
            return data
        case LibraryHeaderFilterEnum.Images:
            data = await _imageService.getImages({ limit, pageNumber })
            return data
    }
}
