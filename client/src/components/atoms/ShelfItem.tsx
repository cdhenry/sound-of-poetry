import React from 'react';

import { HandwritingFontEnum } from '../../enums/fonts';
import { IShelfItem } from '../../interfaces/atoms';

export default function ShelfItem(props: IShelfItem): JSX.Element {
    const { title, handwritingEnumKey, handleListItem } = props
    const border = ' border-2 border-warmGray-700 shadow-lg'
    const font = ` font-${HandwritingFontEnum[handwritingEnumKey as never]} text-2xl text-gray-800`
    const hover = ' hover:bg-coolGray-400'
    const defaultClassName =
        `flex justify-center p-3 w-44 h-64 bg-trueGray-200 overflow-hidden cursor-pointer` + border + font + hover
    const handleClick = () => {
        handleListItem(props.id, handwritingEnumKey)
    }

    return (
        <div className={defaultClassName} onClick={handleClick}>
            <span className="mt-10">{title}</span>
        </div>
    )
}
