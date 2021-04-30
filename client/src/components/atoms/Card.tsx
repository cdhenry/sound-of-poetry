import React from 'react';

import { CardTypeEnum } from '../../enums/cardType';
import { HandwritingFontEnum } from '../../enums/fonts';
import { ICardProps } from '../../interfaces/atoms';

export default function Card(props: ICardProps): JSX.Element {
    const { header, handwritingEnumKey, height, width, children } = props
    let background = '',
        border = ''

    switch (props.cardType) {
        case CardTypeEnum.Paper:
            background = 'bg-yellow-50'
            break
        case CardTypeEnum.Modal:
            background = 'bg-gray-200'
            border = 'border-2 border-gray-800 rounded'
            break
        case CardTypeEnum.SeeThrough:
            background = 'bg-blueGray-200 bg-opacity-50'
            border = 'border-2 border-gray-800 rounded'
            break
        default:
    }

    const font = handwritingEnumKey
        ? `font-${HandwritingFontEnum[handwritingEnumKey as never]} text-2xl text-gray-800`
        : 'text-lg text-gray-800'
    const defaultClassName = `${height} ${width} overflow-y-auto m-2 p-7 shadow-lg ${background} ${border} ${font}`

    return (
        <section className={defaultClassName}>
            <div className="flex-none">{header}</div>
            <div className="flex-grow h-full">{children}</div>
        </section>
    )
}
