import React from 'react';

import Card from '../../components/atoms/Card';
import Header from '../../components/atoms/Header';
import { CardTypeEnum } from '../../enums/cardType';
import { LibraryHeaderFilterEnum } from '../../enums/filters';
import { HeaderTypeEnum } from '../../enums/headerType';
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind';
import { IImage } from '../../interfaces/image';
import { ILibraryListItemSwitch } from '../../interfaces/pages';
import { IPoem } from '../../interfaces/poem';
import { IPoet } from '../../interfaces/poet';
import { ISound } from '../../interfaces/sound';
import { IWord } from '../../interfaces/word';

export default function ListItemSwitch(props: ILibraryListItemSwitch): JSX.Element {
    const { headerFilterType, listItemHandwriting, listItem } = props

    switch (headerFilterType) {
        case LibraryHeaderFilterEnum.Poems:
            const poem = listItem.poem as IPoem
            const poemLines = poem.poem_string.split(/\n/)
            const wordNetLemmas = listItem.wordNetList.map((word: any) => word.lemma)

            let poemContent: React.ReactNode[] = []

            poemLines.forEach((line: any) => {
                const words = line.split(' ')

                words.forEach((word: string) => {
                    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                    const cleanedWord = word.replace(regex, '').toLowerCase()

                    poemContent.push(
                        <>
                            <button
                                className={`whitespace-pre hover:text-shadow-lg ${
                                    wordNetLemmas.includes(cleanedWord) ? 'hover:text-cyan-500' : 'hover:text-rose-500'
                                }`}
                            >
                                {word}
                            </button>{' '}
                        </>
                    )
                })

                poemContent.push(<br />)
            })

            return (
                <Card
                    height={TailwindHeightEnum.Screen90}
                    width={TailwindWidthEnum.OneHalf}
                    handwritingEnumKey={listItemHandwriting}
                    cardType={CardTypeEnum.Paper}
                    header={
                        <Header headerType={HeaderTypeEnum.HeaderWeb}>
                            {poem.title} by {poem.poet_name}
                        </Header>
                    }
                >
                    <>{poemContent}</>
                </Card>
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
