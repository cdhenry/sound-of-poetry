import React from 'react';

import { ITableListRowProps } from '../../interfaces/molecules';

export default function TableListRow(props: ITableListRowProps): JSX.Element {
    const border = 'border border-warmGray-700'
    const hover = 'hover:bg-blueGray-400'
    const defaultClassName = `bg-trueGray-200 overflow-hidden ${border} ${hover}`

    return (
        <tr {...props} className={`${props.className ? props.className : ''} ${defaultClassName}`}>
            {props.children}
        </tr>
    )
}
