import React from 'react';

import { randomInteger } from '../../common/utils/randomInteger';
import { HandwritingFontEnum } from '../../enums/fonts';
import { IShelfItem } from '../../interfaces/atoms';

export default function ShelfItem(props: IShelfItem): JSX.Element {
    const { title } = props
    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never
    const border = ' border-2 border-warmGray-700 shadow-lg'
    const font = ` font-${HandwritingFontEnum[handwritingKey]} text-2xl text-gray-800`
    const hover = ' hover:bg-coolGray-400'
    const defaultClassName =
        `flex justify-center p-3 w-44 h-64 bg-trueGray-200 overflow-hidden cursor-pointer` + border + font + hover

    return (
        <div className={defaultClassName}>
            <span className="mt-10">{title}</span>
        </div>
    )
}
