import React from 'react'

import { HandwritingFontEnum } from '../../enums/fonts'
import { ITableListItem } from '../../interfaces/atoms'

export default function TableListItem(props: ITableListItem): JSX.Element {
    const { item, handwritingEnumKey, handleListItem } = props
    const border = ' border border-warmGray-700'
    const font = ` font-${HandwritingFontEnum[handwritingEnumKey as never]} text-2xl text-gray-800`
    const hover = ' hover:bg-coolGray-400'
    const defaultClassName = `p-3 bg-trueGray-200 overflow-hidden cursor-pointer` + border + font + hover
    const handleClick = () => {
        handleListItem(props.item, handwritingEnumKey)
    }

    return (
        <>
            {Object.keys(item).map((key: string) => (
                <td className={defaultClassName} onClick={handleClick}>
                    {(item as any)[key]}
                </td>
            ))}
        </>
    )
}
