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
import { IPoet } from '../../interfaces/poet'
import { IParams } from '../../interfaces/shared'
import { PoetService, poetService } from '../../services/poet'
import Loading from '../Loading'

export default function Poet(): JSX.Element {
    const _poetService: PoetService = poetService

    const { id } = useParams<IParams>()

    const [isLoading, setIsLoading] = useState(true)
    const [poet, setPoet] = useState({} as IPoet)
    const [poetContent, setPoetContent] = useState([] as React.ReactNode[])

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)

            const poetData = await _poetService.getPoet(parseInt(id))
            //const wordNetData = await _poetService.getPoemWordNet(parseInt(id))
            const poetLines = poetData.bio.split(/\n/)
            const content = [] as React.ReactNode[]
            poetLines.forEach((line: any) => {
                content.push(<p className={'whitespace-pre word-wrap:break-word'}>{line} </p>)
                
                // const words = line.split(' ')

                // words.forEach((word: string, index: number) => {
                //     //const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                //     content.push(<span className={'whitespace-pre hover:text-shadow-lg hover:text-rose-500'}>{word} </span>)
                //     //const cleanedWord = word.replace(regex, '').toLowerCase()
                //     //const wordNetWord = wordNetData.find((item: any) => item.lemma === cleanedWord)

                //     // content.push(
                //     //     wordNetWord?.word_id ? (
                //     //         <Link
                //     //             className={'whitespace-pre hover:text-shadow-lg hover:text-cyan-500'}
                //     //             to={`${RoutesEnum.Words}/${wordNetWord?.word_id}`}
                //     //         >
                //     //             {word}{' '}
                //     //         </Link>
                //     //     ) : (
                //     //         <span className={'whitespace-pre hover:text-shadow-lg hover:text-rose-500'}>{word} </span>
                //     //     )
                //     // )
                // })

                // content.push(<br />)
            })

            setPoet(poetData)
            setPoetContent(content)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poetService, id])

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
                    {poet.name}
                </Header>
            }
        >
            <>{poetContent}</>
        </Card>
    )
}
