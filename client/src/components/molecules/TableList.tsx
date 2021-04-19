import React from 'react'

import { ITableList } from '../../interfaces/molecules'
import TableListItem from '../atoms/TableListItem'

export default function TableList(props: ITableList): JSX.Element {
    return (
        <table>
            <thead>
                {props.headers.map((header) => (
                    <th>{header}</th>
                ))}
            </thead>
            {props.items?.map((item, index) => (
                <tr key={props.context + 'ListItem' + index}>
                    <TableListItem {...item} />
                </tr>
            ))}
        </table>
    )
}
