<<<<<<< HEAD
import React from 'react';

import { CardTypeEnum } from '../../enums/cardType';
import { HandwritingFontEnum } from '../../enums/fonts';
import { ICardProps } from '../../interfaces/atoms';
=======
import React from 'react'

import { CardTypeEnum } from '../../enums/cardType'
import { HandwritingFontEnum } from '../../enums/fonts'
import { ICardProps } from '../../interfaces/atoms'
>>>>>>> main

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
<<<<<<< HEAD
            background = 'bg-blueGray-200 opacity-50'
=======
            background = 'bg-blueGray-200 bg-opacity-50'
>>>>>>> main
            border = 'border-2 border-gray-800 rounded'
            break
        default:
    }

    const font = handwritingEnumKey
        ? `font-${HandwritingFontEnum[handwritingEnumKey as never]} text-2xl text-gray-800`
<<<<<<< HEAD
        : 'text-2xl text-gray-800'
=======
        : 'text-lg text-gray-800'
>>>>>>> main
    const defaultClassName = `${height} ${width} overflow-y-auto m-2 p-7 shadow-lg ${background} ${border} ${font}`

    return (
        <section className={defaultClassName}>
            <div>{header}</div>
            <div>{children}</div>
        </section>
    )
}
