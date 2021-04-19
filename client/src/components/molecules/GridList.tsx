import React from 'react'

import { IGridList as IGrid } from '../../interfaces/molecules'
import GridListItem from '../atoms/GridListItem'

export default function GridList(props: IGrid): JSX.Element {
    return (
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center gap-10">
            {props.items?.map((book, index) => (
                <div key={props.context + 'GridItem' + index}>
                    <GridListItem {...book} />
                </div>
            ))}
        </section>
    )
}
