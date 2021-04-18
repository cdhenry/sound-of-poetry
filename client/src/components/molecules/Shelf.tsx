import React from 'react';

import { IShelf } from '../../interfaces/molecules';
import ShelfItem from '../atoms/ShelfItem';

export default function Shelf(props: IShelf): JSX.Element {
    return (
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center gap-10">
            {props.items?.map((book, index) => (
                <div key={props.context + 'BookShelf' + index}>
                    <ShelfItem {...book} />
                </div>
            ))}
        </section>
    )
}
