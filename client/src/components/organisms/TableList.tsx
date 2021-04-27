import React from 'react'

import { ITableListProps } from '../../interfaces/organisms'
import TableListRow from '../molecules/TableListRow'

export default function TableList(props: ITableListProps): JSX.Element {
    return (
        <table>
            <thead>
                <TableListRow>
                    {props.headers.map((header, index) => (
                        <th className="p-2 text-left bg-blueGray-400" key={`${props.context}Header${index}`}>
                            {header}
                        </th>
                    ))}
                </TableListRow>
            </thead>
            <tbody>{props.children}</tbody>
        </table>
    )
}
