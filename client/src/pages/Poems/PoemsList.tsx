import React from 'react'

import TableList from '../../components/organisms/TableList'
import { IPoemListItem } from '../../interfaces/poem'
import PoemsRow from './PoemsRow'

export default function PoemsList(props: { list: IPoemListItem[] }): JSX.Element {
    const tableHeaders = ['Title', 'Author', 'Topics', 'Related Media']

    return (
        <TableList context="PoemsTableList" headers={tableHeaders}>
            {props.list?.map((item, index) => {
                return <PoemsRow key={`PoemsTableListRow${index}`} item={item} />
            })}
        </TableList>
    )
}
