import React from 'react'
import Select, { OptionTypeBase } from 'react-select'

import { WordOrderByEnum } from '../../enums/orderBy'
import { IWordFiltersProps } from '../../interfaces/word'

export default function WordFilters(props: IWordFiltersProps): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100 w-11/12'

    const orderByOptions: OptionTypeBase[] = [
        { value: WordOrderByEnum.AZ, label: 'A-Z' },
        { value: WordOrderByEnum.ZA, label: 'Z-A' },
        { value: WordOrderByEnum.MostFrequentlyUsed, label: 'Most Frequently Used' },
        { value: WordOrderByEnum.UsedbyMostPoems, label: 'Used by Most Poems' }
    ]

    const onOrderByChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ orderBy: selectOption?.value as WordOrderByEnum })
    }

    return (
        <section className={defaultClassName}>
            <Select placeholder="Order by" options={orderByOptions} onChange={onOrderByChange} />
        </section>
    )
}
