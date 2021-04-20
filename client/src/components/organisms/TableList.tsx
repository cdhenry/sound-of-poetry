import React from 'react'

import { ITableListProps } from '../../interfaces/organisms'

export default function TableList(props: ITableListProps): JSX.Element {
    return (
        <table>
            <thead>
                {props.headers.map((header) => (
                    <th>{header}</th>
                ))}
            </thead>
            {props.children}
        </table>
    )
}
