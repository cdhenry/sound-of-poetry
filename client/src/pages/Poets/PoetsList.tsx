import React from 'react'

import TableList from '../../components/organisms/TableList'
import { IPoetListItem } from '../../interfaces/poet'
import PoetsRow from './PoetsRow'

export default function PoetsList(props: { list: IPoetListItem[] }): JSX.Element {
    const tableHeaders = ['Author', 'Year of Birth', 'Year of Death']

    return (
        <TableList context="PoetsTableList" headers={tableHeaders}>
            {props.list?.map((item, index) => {
                return <PoetsRow key={`PoetsTableListRow${index}`} item={item} />
            })}
        </TableList>
    )
}
