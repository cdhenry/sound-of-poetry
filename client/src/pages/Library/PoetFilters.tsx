import React from 'react';

import { ILibraryClassFilters } from '../../interfaces/filters';

export default function LibraryPoetFilters(props: ILibraryClassFilters): JSX.Element {
    const defaultClassName = 'grid grid-cols-4 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100'

    return <section className={defaultClassName}></section>
}
