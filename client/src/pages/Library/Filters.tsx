import React, { MouseEvent } from 'react';

import { LibraryFilterEnum } from '../../enums/filters';
import { ILibraryFilters } from '../../interfaces/filters';

export default function LibraryFilters(props: ILibraryFilters): JSX.Element {
    const defaultClassName = 'flex justify-around m-2 p-2 border-gray-500 border-2 rounded bg-gray-50'
    const buttonClassName = 'cursor-pointer bg-gray-50 hover:text-gray-500 active:text-black'
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
