import React from 'react'

import { LibraryHeaderFilterEnum } from '../../enums/filters'
import { ILibraryClassFilterSwitch } from '../../interfaces/library'
import LibraryPoemFilters from './PoemFilters'
import LibraryPoetFilters from './PoetFilters'
import LibraryWordFilters from './WordFilters'

export default function ClassFilterSwitch(props: ILibraryClassFilterSwitch): JSX.Element {
    const { headerFilterType, handleClassFilterChange } = props

    switch (headerFilterType) {
        case LibraryHeaderFilterEnum.Poems:
            return <LibraryPoemFilters handleFilterChange={handleClassFilterChange} />
        case LibraryHeaderFilterEnum.Poets:
            return <LibraryPoetFilters handleFilterChange={handleClassFilterChange} />
        case LibraryHeaderFilterEnum.Words:
            return <LibraryWordFilters handleFilterChange={handleClassFilterChange} />
        default:
            return <></>
    }
}
