import React from 'react'

import { ITableListItemProps } from '../../interfaces/atoms'

export default function TableListItem(props: ITableListItemProps): JSX.Element {
    const border = 'border border-warmGray-700'
    const font = `text-lg text-gray-800`
    const hover = 'hover:bg-coolGray-400'
    const defaultClassName = `p-3 bg-trueGray-200 overflow-hidden cursor-pointe ${border} ${font} ${hover}`

    return (
        <td className={`${props.className} ${defaultClassName}`} {...props}>
            {props.children}
        </td>
    )
}
