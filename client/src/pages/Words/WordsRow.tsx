import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import TableListItem from '../../components/atoms/TableListItem';
import TableListRow from '../../components/molecules/TableListRow';
import { IWordTableRowProps } from '../../interfaces/word';

export default function WordsRow(props: IWordTableRowProps): JSX.Element {
    const { item } = props
    const { url } = useRouteMatch()

    return (
        <TableListRow className="cursor-pointer">
            <TableListItem className="w-1/5">
                {/* <Link to={{ pathname: `${url}/${item.id}` }}>{item.lemma}</Link> */}
                {item.lemma}
            </TableListItem>
            <TableListItem className="w-1/5">{item.occurrence.toLocaleString()}</TableListItem>
            <TableListItem className="w-1/5">{item.num_poems.toLocaleString()}</TableListItem>
            <TableListItem className="w-1/5">{item.sound_count?.toLocaleString()}</TableListItem>
            <TableListItem className="w-1/5">{item.image_count?.toLocaleString()}</TableListItem>
        </TableListRow>
    )
}
