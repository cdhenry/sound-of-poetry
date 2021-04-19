import React, { MouseEvent } from 'react'

import ToggleInput from '../../components/atoms/ToggleInput'
import { LibraryHeaderFilterEnum } from '../../enums/filters'
import { ILibraryHeaderFilters } from '../../interfaces/filters'

export default function LibraryHeaderFilters(props: ILibraryHeaderFilters): JSX.Element {
    const defaultClassName = 'flex justify-around p-2 border-gray-500 border-2 rounded bg-indigo-100'
    const buttonClassName = 'cursor-pointer bg-transparent'
    const handleFilterChange = (event: MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        props.handleFilterChange(target.value as LibraryHeaderFilterEnum, target.checked)
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
            <ToggleInput
                label="View"
                labelLeft="Grid"
                labelRight="List"
                onClick={handleFilterChange}
                value={LibraryHeaderFilterEnum.View}
            />
        </section>
    )
}
