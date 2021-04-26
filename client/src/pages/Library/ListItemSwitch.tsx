import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import Card from '../../components/atoms/Card'
import { CardTypeEnum } from '../../enums/cardType'
import { LibraryHeaderFilterEnum } from '../../enums/filters'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { IImage } from '../../interfaces/image'
import { ILibraryListItemSwitch } from '../../interfaces/library'
import { IPoet } from '../../interfaces/poet'
import { ISound } from '../../interfaces/sound'
import { IWord } from '../../interfaces/word'
import Poem from './Poem/Poem'

export default function ListItemSwitch(props: ILibraryListItemSwitch): JSX.Element {
    const { url } = useRouteMatch()
    const { headerFilterType, listItemHandwriting, listItem } = props

    switch (headerFilterType) {
        case LibraryHeaderFilterEnum.Poems:
            return (
                <Poem
                    url={url}
                    poem={listItem.poem}
                    wordNetList={listItem.wordNetList}
                    listItemHandwriting={listItemHandwriting}
                />
            )
        case LibraryHeaderFilterEnum.Poets:
            const poetContent = (listItem as IPoet).bio
            return (
                <Card
                    cardType={CardTypeEnum.Paper}
                    height={TailwindHeightEnum.Screen90}
                    width={TailwindWidthEnum.OneHalf}
                    handwritingEnumKey={listItemHandwriting}
                >
                    <>{poetContent}</>
                </Card>
            )
        case LibraryHeaderFilterEnum.Words:
            const wordContent = (listItem as IWord).definition
            return (
                <Card
                    cardType={CardTypeEnum.Paper}
                    height={TailwindHeightEnum.Screen90}
                    width={TailwindWidthEnum.OneHalf}
                    handwritingEnumKey={listItemHandwriting}
                >
                    <>{wordContent}</>
                </Card>
            )
        case LibraryHeaderFilterEnum.Sounds:
            const soundContent = (listItem as ISound).ytid
            return (
                <Card
                    cardType={CardTypeEnum.Paper}
                    height={TailwindHeightEnum.Screen90}
                    width={TailwindWidthEnum.OneHalf}
                    handwritingEnumKey={listItemHandwriting}
                >
                    <>{soundContent}</>
                </Card>
            )
        case LibraryHeaderFilterEnum.Images:
            const imageContent = (listItem as IImage).image_url
            return (
                <Card
                    cardType={CardTypeEnum.Paper}
                    height={TailwindHeightEnum.Screen90}
                    width={TailwindWidthEnum.OneHalf}
                    handwritingEnumKey={listItemHandwriting}
                >
                    <>{imageContent}</>
                </Card>
            )
        default:
            return <></>
    }
}
