import React from 'react'

import { randomInteger } from '../../common/utils/randomInteger'
import TableList from '../../components/molecules/TableList'
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

    const handleListItem = async (item: ILibraryListItemType, handwriting: never) => {
        await getListItem(item, handwriting)
    }

    const headers = () => {
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                return ['Title', 'Author', 'Topics', 'Actions']
            case LibraryHeaderFilterEnum.Words:
                return ['Title', 'Author', 'Topics', 'Actions']
            case LibraryHeaderFilterEnum.Sounds:
                return ['Title', 'Author', 'Topics', 'Actions']
            case LibraryHeaderFilterEnum.Images:
                return ['Title', 'Author', 'Topics', 'Actions']
            default:
                return ['Title', 'Author', 'Topics', 'Actions']
        }
    }

    const items = list?.map((item: ILibraryListItemType) => {
        const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
        const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                item = item as IPoet
                return {
                    item: item,
                    handleListItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Words:
                item = item as IWord
                return {
                    item,
                    handleListItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Sounds:
                item = item as ISound
                return {
                    item,
                    handleListItem,
                    handwritingEnumKey
                }
            case LibraryHeaderFilterEnum.Images:
                item = item as IImage
                return {
                    item,
                    handleListItem,
                    handwritingEnumKey
                }
            default:
                item = item as IPoemListItem
                const displayItem = { id: item.id, title: item.title, poetName: item.poet_name, tags: item.tags }
                return {
                    item: displayItem,
                    handleListItem,
                    handwritingEnumKey
                }
        }
    })

    return <TableList context="LibraryTableList" headers={headers()} items={items} />
}
