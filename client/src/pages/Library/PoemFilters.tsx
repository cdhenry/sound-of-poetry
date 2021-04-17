import React from 'react';

import SelectInput from '../../components/molecules/SelectInput';
import { ILibraryClassFilters } from '../../interfaces/filters';

export default function LibraryPoemFilters(props: ILibraryClassFilters): JSX.Element {
    const defaultClassName = 'grid grid-cols-4 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100'

    return (
        <section className={defaultClassName}>
            <SelectInput placeholder="Type to select titles" />
            <SelectInput placeholder="Type to select poets" />
            <SelectInput placeholder="Type to select tags" />
            <SelectInput placeholder="Type to select words" />
        </section>
    )
}
