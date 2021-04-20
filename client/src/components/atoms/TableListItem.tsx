import React from 'react'

import { ITableListItem } from '../../interfaces/atoms'

export default function TableListItem(props: ITableListItem): JSX.Element {
    const { item, handwritingEnumKey, handleListItem } = props
    const border = ' border border-warmGray-700'
    const font = ` text-lg text-gray-800`
    const hover = ' hover:bg-coolGray-400'
    const defaultClassName = `p-3 bg-trueGray-200 overflow-hidden cursor-pointer` + border + font + hover

    const displayListItem = () => {
        const keys = Object.keys(item)
        let row = []
        for (let i = 1; i < keys.length; i++) {
            const key = keys[i]
            if (Array.isArray(item[key])) {
                row.push(<td className={defaultClassName}>{item[key].join(', ')}</td>)
            } else {
                row.push(<td className={defaultClassName}>{item[key]}</td>)
            }
        }
        return row
    }

    return <>{displayListItem()}</>
}
