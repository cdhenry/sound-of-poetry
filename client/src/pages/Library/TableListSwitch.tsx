import React, { useState } from 'react'

import { randomInteger } from '../../common/utils/randomInteger'
import TableListItem from '../../components/atoms/TableListItem'
import TableListRow from '../../components/molecules/TableListRow'
import TableList from '../../components/organisms/TableList'
import { LibraryHeaderFilterEnum } from '../../enums/filters'
import { HandwritingFontEnum } from '../../enums/fonts'
import { IImage } from '../../interfaces/image'
import { ILibraryListSwitch } from '../../interfaces/library'
import { IPoemListItem } from '../../interfaces/poem'
import { IPoet } from '../../interfaces/poet'
import { ILibraryListItemType } from '../../interfaces/shared'
import { ISound } from '../../interfaces/sound'
import { IWord } from '../../interfaces/word'
import LibraryPoemTableRow from './Poem/PoemTableRow'

export default function TableListSwitch(props: ILibraryListSwitch): JSX.Element {
    const { list, headerFilterType, getListItem } = props
    const context = 'TableListSwitch'
    const [isModalActive, setIsModalActive] = useState(false)
    const [modal, setModal] = useState(<></>)
    const handleListItem = async (item: ILibraryListItemType, handwriting: never) => {
        await getListItem(item, handwriting)
    }
    const toggleIsModalActive = () => {
        setIsModalActive(!isModalActive)
    }
    const headers = () => {
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                return ['Name', 'Lifespan', 'Actions']
            case LibraryHeaderFilterEnum.Words:
                return ['Word', 'Part of Speech', 'Definition', 'Sample Use', 'Actions']
            case LibraryHeaderFilterEnum.Sounds:
                return ['TYID', 'Start Seconds', 'End Seconds', 'Display Name', 'Actions']
            case LibraryHeaderFilterEnum.Images:
                return ['Word', 'Part of Speech', 'Definition', 'Actions']
            case LibraryHeaderFilterEnum.Poems:
                return ['Title', 'Author', 'Topics', 'Related Media']
            default:
                return []
        }
    }

    const rows = list?.map((item: ILibraryListItemType, index: number) => {
        const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
        const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never

        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poems:
                return (
                    <LibraryPoemTableRow
                        context={`Poems${context}Row${index}`}
                        item={item as IPoemListItem}
                        handwritingEnumKey={handwritingEnumKey}
                    />
                )
            case LibraryHeaderFilterEnum.Poets:
                item = item as IPoet
                return (
                    <TableListRow key={`Poets${context}Row${index}`}>
                        <TableListItem>{item.name}</TableListItem>
                        <TableListItem>
                            {item.yob} - {item.yod}
                        </TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Words:
                item = item as IWord
                return (
                    <TableListRow key={`Words${context}Row${index}`}>
                        <TableListItem>{item.lemma}</TableListItem>
                        <TableListItem>{item.pos}</TableListItem>
                        <TableListItem>{item.definition}</TableListItem>
                        <TableListItem>{item.sampleset}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Sounds:
                item = item as ISound
                return (
                    <TableListRow key={`Sounds${context}Row${index}`}>
                        <TableListItem>{item.ytid}</TableListItem>
                        <TableListItem>{item.start_seconds}</TableListItem>
                        <TableListItem>{item.end_seconds}</TableListItem>
                        <TableListItem>{item.display_name}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Images:
                item = item as IImage
                return (
                    <TableListRow key={`Images${context}Row${index}`}>
                        <TableListItem>{item.lemma}</TableListItem>
                        <TableListItem>{item.pos}</TableListItem>
                        <TableListItem>{item.definition}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            default:
                return <></>
        }
    })

    return (
        <TableList context={context} headers={headers()}>
            {rows}
        </TableList>
    )
}
