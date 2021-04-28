import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import TableListItem from '../../components/atoms/TableListItem'
import TableListRow from '../../components/molecules/TableListRow'
import { IWordTableRowProps } from '../../interfaces/word'

export default function WordsRow(props: IWordTableRowProps): JSX.Element {
    const { item } = props
    const { url } = useRouteMatch()

    return (
        <TableListRow>
            <TableListItem className="cursor-pointer">
                {/* <Link to={{ pathname: `${url}/${item.id}` }}>{item.lemma}</Link> */}
                {item.lemma}
            </TableListItem>
            <TableListItem>{item.definition}</TableListItem>
            <TableListItem>{item.occurrence}</TableListItem>
            <TableListItem>{item.num_poems}</TableListItem>
        </TableListRow>
    )
}
