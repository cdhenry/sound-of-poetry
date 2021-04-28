import React from 'react'

import TableList from '../../components/organisms/TableList'
// import { IPoemListItem } from '../../interfaces/poem'
import { IWordTableRowProps, IWord, IWordTableListProps} from '../../interfaces/word'

// import PoemsRow from './WordsRow'
import WordsRow from './WordsRow'
// export default function WordsList(props: { list: IPoemListItem[] }): JSX.Element {
    export default function WordsList(props: IWordTableListProps): JSX.Element {

    const tableHeaders = ['Word', 'Definition', 'Occurence', 'Usage (number of poems)']

    return (

        <TableList context="WordsTableList" headers={tableHeaders}>
        {props.list?.map((item, index) => {
            return <WordsRow key={`WordsTableListRow${index}`} item={item} />
        })}
    </TableList>
    )
}
