import React from 'react';

import SelectInput from '../../components/molecules/SelectInput';
import { ILibraryClassFilters } from '../../interfaces/filters';

export default function LibraryWordFilters(props: ILibraryClassFilters): JSX.Element {
    const defaultClassName = 'flex justify-around p-2 border-gray-500 border-2 rounded bg-indigo-100'

    return (
        <section className={defaultClassName}>
            <SelectInput />
        </section>
    )
}
