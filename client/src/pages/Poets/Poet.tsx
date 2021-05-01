import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { randomInteger } from '../../common/utils/randomInteger';
import Card from '../../components/atoms/Card';
import Header from '../../components/atoms/Header';
import { CardTypeEnum } from '../../enums/cardType';
import { HandwritingFontEnum } from '../../enums/fonts';
import { HeaderTypeEnum } from '../../enums/headerType';
import { RoutesEnum } from '../../enums/routes';
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind';
import { IPoet } from '../../interfaces/poet';
import { IParams } from '../../interfaces/shared';
import { PoemService, poemService } from '../../services/poem';
import { PoetService, poetService } from '../../services/poet';
import Loading from '../Loading';

export default function Poet(): JSX.Element {
    const _poetService: PoetService = poetService
    const _poemService: PoemService = poemService

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = useRef(handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never)
    const { id } = useParams<IParams>()

    const [isLoading, setIsLoading] = useState(true)
    const [poet, setPoet] = useState({} as IPoet)
    const [poetContent, setPoetContent] = useState([] as React.ReactNode[])

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)
            const poetId = parseInt(id)
            const poetData = await _poetService.getPoet(poetId)
            const poemList = await _poemService.getPoems(
                { limit: Number.MAX_SAFE_INTEGER, pageNumber: 0 },
                { poets: [poetId] }
            )
            console.log(poemList)
            const poemListContent = [] as React.ReactNode[]

            poemList.items.forEach((poem) => {
                poemListContent.push(
                    <div className="hover:text-shadow-lg hover:text-cyan-500">
                        <Link to={`${RoutesEnum.Poems}/${poem.id}`}>{poem.title}</Link>
                    </div>
                )
            })

            setPoet(poetData)
            setPoetContent(poemListContent)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poemService, _poetService, id])

    useEffect(() => {
        getPoem()
    }, [])

    return isLoading ? (
        <Loading />
    ) : (
        <section className="grid grid-cols-2 w-11/12">
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.SeeThrough}
                header={
                    <Header headerType={HeaderTypeEnum.HeaderWeb}>
                        {poet.name} {poet.yob && <span>, {poet.yob}</span>} {poet.yod && <span>- {poet.yod}</span>}
                    </Header>
                }
            >
                <section className="grid grid-flow-rows gap-6">
                    <img src={poet.img_url} alt={poet.name} />
                    {poet.bio}
                </section>
            </Card>
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.Paper}
                handwritingEnumKey={handwritingEnumKey.current}
                header={<Header headerType={HeaderTypeEnum.HeaderWeb}>Poems</Header>}
            >
                <>{poetContent}</>
            </Card>
        </section>
    )
}
