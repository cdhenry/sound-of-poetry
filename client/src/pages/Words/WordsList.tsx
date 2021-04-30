import React from 'react';

import TableList from '../../components/organisms/TableList';
import { IWordTableListProps } from '../../interfaces/word';
import WordsRow from './WordsRow';

export default function WordsList(props: IWordTableListProps): JSX.Element {
    const tableHeaders = ['Word', 'Occurrences', 'Usages (number of poems)', 'Sound Associations', 'Image Associations']

    return (
        <TableList context="WordsTableList" headers={tableHeaders}>
            {props.list?.map((item, index) => {
                return <WordsRow key={`WordsTableListRow${index}`} item={item} />
            })}
        </TableList>
    )
}
