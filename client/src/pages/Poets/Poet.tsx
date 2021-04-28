import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { randomInteger } from '../../common/utils/randomInteger'
import Card from '../../components/atoms/Card'
import Header from '../../components/atoms/Header'
import { CardTypeEnum } from '../../enums/cardType'
import { HeaderTypeEnum } from '../../enums/headerType'
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

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)

            const poetData = await _poetService.getPoet(parseInt(id))
            const poetLines = poetData.bio.trim().split(/\n/)
            const content = [] as React.ReactNode[]
            poetLines.forEach((line: any) => {                
                const words = line.split(' ')

                var counter = 0;
                words.forEach((word: string, index: number) => {
                    content.push(<span className={'whitespace-pre'}>{word} </span>)
                    counter++  
                    if (counter === 12){
                        content.push(<span className={'whitespace-pre hover:text-shadow-lg hover:text-rose-500'}>{"\n"} </span>)
                        counter = 0;
                    }
                })
                content.push(<br />)
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
