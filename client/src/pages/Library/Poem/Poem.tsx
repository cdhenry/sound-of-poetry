import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import Card from '../../../components/atoms/Card'
import Header from '../../../components/atoms/Header'
import { CardTypeEnum } from '../../../enums/cardType'
import { HeaderTypeEnum } from '../../../enums/headerType'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../../enums/tailwind'
import { ILibraryPoemProps } from '../../../interfaces/library'
import LibraryWord from '../Word'

export default function LibraryPoem(props: ILibraryPoemProps): JSX.Element {
    const { url, poem, wordNetList, listItemHandwriting } = props
    const poemLines = poem.poem_string.split(/\n/)

    let poemContent: React.ReactNode[] = []

    poemLines.forEach((line: any) => {
        const words = line.split(' ')

        words.forEach((word: string, index: number) => {
            const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
            const cleanedWord = word.replace(regex, '').toLowerCase()
            const wordNetWord = wordNetList.find((item: any) => item.lemma === cleanedWord)

            poemContent.push(
                <>
                    <Link
                        className={`whitespace-pre hover:text-shadow-lg ${
                            wordNetWord ? 'hover:text-cyan-500' : 'hover:text-rose-500'
                        }`}
                        to={`${url}/word/${cleanedWord}`}
                    >
                        {word}
                    </Link>{' '}
                    <Switch>
                        <Route path={`${url}/word/:id`}>
                            <LibraryWord word={wordNetWord || cleanedWord} isWordnet={!!wordNetWord} />
                        </Route>
                    </Switch>
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
}
