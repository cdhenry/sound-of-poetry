import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import TableListItem from '../../components/atoms/TableListItem';
import TableListRow from '../../components/molecules/TableListRow';
import { IPoetTableRowProps } from '../../interfaces/poet';

export default function PoetsRow(props: IPoetTableRowProps): JSX.Element {
    const { item } = props
    const { url } = useRouteMatch()

    return (
        <TableListRow className="cursor-pointer">
            <TableListItem>
                <Link to={{ pathname: `${url}/${item.id}` }}>{item.name}</Link>
            </TableListItem>
            <TableListItem>{item.region}</TableListItem>
            <TableListItem>{item.school}</TableListItem>
            <TableListItem>
                {item.yob} - {item.yod}
            </TableListItem>
        </TableListRow>
    )
}
