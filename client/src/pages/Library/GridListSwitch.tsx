import React from 'react'

import { randomInteger } from '../../common/utils/randomInteger'
import GridList from '../../components/organisms/GridList'
import { LibraryHeaderFilterEnum } from '../../enums/filters'
import { HandwritingFontEnum } from '../../enums/fonts'
import { IImage } from '../../interfaces/image'
import { ILibraryListSwitch } from '../../interfaces/pages'
import { IPoemListItem } from '../../interfaces/poem'
import { IPoet } from '../../interfaces/poet'
import { ILibraryListItemType } from '../../interfaces/shared'
import { ISound } from '../../interfaces/sound'
import { IWord } from '../../interfaces/word'

export default function TableListSwitch(props: ILibraryListSwitch): JSX.Element {
    const { list, headerFilterType, getListItem } = props

    const handleGridItem = async (id: any, handwriting: never) => {
        await getListItem(id, handwriting)
    }

    const items = list?.map((item: ILibraryListItemType) => {
        const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
        const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                item = item as IPoet
                return {
                    id: item.id,
                    title: item.name,
                    handleGridItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Words:
                item = item as IWord
                return {
                    id: item.wordid,
                    title: item.lemma,
                    handleGridItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Sounds:
                item = item as ISound
                return {
                    id: item.ytid,
                    title: item.display_name,
                    handleGridItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Images:
                item = item as IImage
                return {
                    id: item.image_url,
                    title: item.lemma,
                    cover: { src: item.image_url, alt: item.lemma },
                    handleGridItem,
                    handwritingEnumKey
                }
            default:
                item = item as IPoemListItem
                return {
                    id: item.id,
                    title: item.title,
                    handleGridItem,
                    handwritingEnumKey
                }
        }
    })

    return <GridList context="LibraryGridList" items={items} />
}
