import React from 'react'

import { ITableListItem } from '../../interfaces/atoms'
import { ITableList } from '../../interfaces/molecules'
import TableListItem from '../atoms/TableListItem'

export default function TableList(props: ITableList): JSX.Element {
    const displayTableListItem = (listItem: ITableListItem, index: number) => {
        const handleClick = () => {
            listItem.handleListItem(listItem.item, listItem.handwritingEnumKey)
        }

        return (
            <tr key={props.context + 'ListItem' + index} onClick={handleClick}>
                <TableListItem {...listItem} />
            </tr>
        )
    }

    return (
        <table>
            <thead>
                {props.headers.map((header) => (
                    <th>{header}</th>
                ))}
            </thead>
            {props.items?.map((item, index) => displayTableListItem(item, index))}
        </table>
    )
}
