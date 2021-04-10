import React, { MouseEvent } from 'react';

import { LibraryFilterEnum } from '../../enums/filters';
import { ILibraryFilters } from '../../interfaces/filters';

export default function LibraryFilters(props: ILibraryFilters): JSX.Element {
    const defaultClassName = 'flex justify-around p-2 border-gray-500 border-2 rounded bg-indigo-100'
    const buttonClassName = 'cursor-pointer bg-transparent'
    const handleFilterChange = (event: MouseEvent<HTMLInputElement>) => {
        props.handleFilterChange((event.target as HTMLInputElement).value as LibraryFilterEnum)
    }

    return (
        <section className={defaultClassName}>
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryFilterEnum.Poems}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryFilterEnum.Poets}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryFilterEnum.Words}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryFilterEnum.Sounds}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryFilterEnum.Images}
            />
        </section>
    )
}
