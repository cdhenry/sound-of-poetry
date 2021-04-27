import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { randomInteger } from '../../common/utils/randomInteger'
import Card from '../../components/atoms/Card'
import Header from '../../components/atoms/Header'
import { CardTypeEnum } from '../../enums/cardType'
import { HandwritingFontEnum } from '../../enums/fonts'
import { HeaderTypeEnum } from '../../enums/headerType'
import { RoutesEnum } from '../../enums/routes'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { IPoem } from '../../interfaces/poem'
import { IParams } from '../../interfaces/shared'
import { PoemService, poemService } from '../../services/poem'
import Loading from '../Loading'

export default function Poem(): JSX.Element {
    const _poemService: PoemService = poemService

    const { id } = useParams<IParams>()

    const [isLoading, setIsLoading] = useState(true)
    const [poem, setPoem] = useState({} as IPoem)
    const [poemContent, setPoemContent] = useState([] as React.ReactNode[])

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)

            const poemData = await _poemService.getPoem(parseInt(id))
            const wordNetData = await _poemService.getPoemWordNet(parseInt(id))
            const poemLines = poemData.poem_string.split(/\n/)
            const content = [] as React.ReactNode[]
            poemLines.forEach((line: any) => {
                const words = line.split(' ')

                words.forEach((word: string, index: number) => {
                    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                    const cleanedWord = word.replace(regex, '').toLowerCase()
                    const wordNetWord = wordNetData.find((item: any) => item.lemma === cleanedWord)

                    content.push(
                        wordNetWord?.word_id ? (
                            <Link
                                className={'whitespace-pre hover:text-shadow-lg hover:text-cyan-500'}
                                to={`${RoutesEnum.Words}/${wordNetWord?.word_id}`}
                            >
                                {word}{' '}
                            </Link>
                        ) : (
                            <span className={'whitespace-pre hover:text-shadow-lg hover:text-rose-500'}>{word} </span>
                        )
                    )
                })

                content.push(<br />)
            })

            setPoem(poemData)
            setPoemContent(content)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poemService, id])

    useEffect(() => {
        getPoem()
    }, [])

    return isLoading ? (
        <Loading />
    ) : (
        <Card
            height={TailwindHeightEnum.Screen90}
            width={TailwindWidthEnum.OneHalf}
            cardType={CardTypeEnum.Paper}
            handwritingEnumKey={handwritingEnumKey}
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
