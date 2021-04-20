import React from 'react'

import { ITableListRowProps } from '../../interfaces/molecules'

export default function TableListRow(props: ITableListRowProps): JSX.Element {
    return <tr {...props}>{props.children}</tr>
}
