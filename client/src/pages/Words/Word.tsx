import React from 'react'

import Card from '../../components/atoms/Card'
import Header from '../../components/atoms/Header'
import { CardTypeEnum } from '../../enums/cardType'
import { HeaderTypeEnum } from '../../enums/headerType'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { WordService, wordService } from '../../services/word'

export default function Word(): JSX.Element {
    const _wordService: WordService = wordService

    return (
        <Card
            height={TailwindHeightEnum.Screen90}
            width={TailwindWidthEnum.OneHalf}
            cardType={CardTypeEnum.Paper}
            header={<Header headerType={HeaderTypeEnum.HeaderWeb}>{}</Header>}
        >
            <>Test</>
        </Card>
    )
}
