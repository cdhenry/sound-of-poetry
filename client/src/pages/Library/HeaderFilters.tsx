import React, { MouseEvent } from 'react';

import { LibraryHeaderFilterEnum } from '../../enums/filters';
import { ILibraryHeaderFilters } from '../../interfaces/filters';

export default function LibraryHeaderFilters(props: ILibraryHeaderFilters): JSX.Element {
    const defaultClassName = 'flex justify-around p-2 border-gray-500 border-2 rounded bg-indigo-100'
    const buttonClassName = 'cursor-pointer bg-transparent'
    const handleFilterChange = (event: MouseEvent<HTMLInputElement>) => {
        props.handleFilterChange((event.target as HTMLInputElement).value as LibraryHeaderFilterEnum)
    }

    return (
        <section className={defaultClassName}>
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.Poems}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.Poets}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.Words}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.Sounds}
            />
            <input
                type="button"
                className={buttonClassName}
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.Images}
            />
        </section>
    )
}
