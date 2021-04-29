import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import TableListItem from '../../components/atoms/TableListItem';
import TableListRow from '../../components/molecules/TableListRow';
import { IPoetTableRowProps } from '../../interfaces/poet';

export default function PoetsRow(props: IPoetTableRowProps): JSX.Element {
    const { item } = props
    const { url } = useRouteMatch()
    const history = useHistory()

    function handleRowClick() {
        history.push(`${url}/${item.id}`)
    }

    return (
        <TableListRow className="cursor-pointer" onClick={handleRowClick}>
            <TableListItem>{item.name}</TableListItem>
            <TableListItem>{item.region}</TableListItem>
            <TableListItem>{item.school}</TableListItem>
            <TableListItem>
                {item.yob} - {item.yod}
            </TableListItem>
        </TableListRow>
    )
}
