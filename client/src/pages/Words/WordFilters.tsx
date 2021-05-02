import React, { useCallback, useEffect, useState } from 'react'
import Select, { OptionsType, OptionTypeBase } from 'react-select'
import AsyncSelect from 'react-select/async'

import { WordOrderByEnum } from '../../enums/orderBy'
import { ISelectOption } from '../../interfaces/shared'
import { IWordFiltersProps } from '../../interfaces/word'
import { PoemService, poemService } from '../../services/poem'
import { PoetService, poetService } from '../../services/poet'
import { WordService, wordService } from '../../services/word'
import Loading from '../Loading'

export default function WordFilters(props: IWordFiltersProps): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100 w-11/12'

    const _wordService: WordService = wordService
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const [tagOptions, setTagsOptions] = useState([] as ISelectOption[])
    const [regionOptions, setRegionOptions] = useState([] as ISelectOption[])
    const [schoolOptions, setSchoolOptions] = useState([] as ISelectOption[])
    const [isLoading, setIsLoading] = useState(true)

    const orderByOptions: OptionTypeBase[] = [
        { value: WordOrderByEnum.AZ, label: 'A-Z' },
        { value: WordOrderByEnum.ZA, label: 'Z-A' },
        { value: WordOrderByEnum.MostFrequentlyUsed, label: 'Most Frequently Used' },
        { value: WordOrderByEnum.UsedByMostPoems, label: 'Used by Most Poems' },
        { value: WordOrderByEnum.MostSounds, label: 'Most Sound Associations' },
        { value: WordOrderByEnum.MostImages, label: 'Most Image Associations' }
    ]

    const getDropdowns = useCallback(async () => {
        try {
            setIsLoading(true)
            const regionData = await _poetService.getRegionsDropdown()
            const schoolData = await _poetService.getSchoolsDropdown()
            const tagData = await _poemService.getTagsDropdown()
            setRegionOptions(regionData)
            setSchoolOptions(schoolData)
            setTagsOptions(tagData)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poetService, _poemService])

    const loadWords = (lemma: string, callback: any) => {
        if (lemma.length > 2) _wordService.getLemmas({ lemma }).then((data) => callback(data))
    }

    const loadTitles = (title: string, callback: any) => {
        if (title.length > 2) _poemService.getTitles({ title }).then((data) => callback(data))
    }

    const loadPoets = (name: string, callback: any) => {
        if (name.length > 2) _poetService.getPoetNames({ name }).then((data) => callback(data))
    }

    const onOrderByChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ orderBy: selectOption?.value as WordOrderByEnum })
    }

    const onWordChange = (words: OptionsType<any>) => {
        props.handleFilterChange({ words: words.map((item) => item.value) })
    }

    const onTitleChange = (poems: OptionsType<any>) => {
        props.handleFilterChange({ poemIds: poems.map((item) => item.value) })
    }

    const onPoetChange = (poets: OptionsType<any>) => {
        props.handleFilterChange({ poets: poets.map((item) => item.value) })
    }

    const onTagChange = (tags: OptionsType<any>) => {
        props.handleFilterChange({ tags: tags.map((item) => item.value) })
    }

    const onRegionChange = (regions: OptionsType<any>) => {
        props.handleFilterChange({ regions: regions.map((item) => item.value) })
    }

    const onSchoolChange = (schools: OptionsType<any>) => {
        props.handleFilterChange({ schools: schools.map((item) => item.value) })
    }

    const noOptionsMessage = () => 'Type to populate options'

    useEffect(() => {
        getDropdowns()
    }, [])

    return (
        <section className={defaultClassName}>
            {isLoading ? (
                <div className="col-span-full">
                    <Loading />
                </div>
            ) : (
                <>
                    <AsyncSelect
                        isMulti
                        placeholder="Poems"
                        isClearable={true}
                        noOptionsMessage={noOptionsMessage}
                        loadOptions={loadTitles}
                        onChange={onTitleChange}
                    />
                    <AsyncSelect
                        isMulti
                        placeholder="Poets"
                        noOptionsMessage={noOptionsMessage}
                        loadOptions={loadPoets}
                        onChange={onPoetChange}
                    />
                    <Select placeholder="Topics" options={tagOptions} onChange={onTagChange} isMulti />
                    <AsyncSelect
                        isMulti
                        placeholder="Words"
                        noOptionsMessage={noOptionsMessage}
                        loadOptions={loadWords}
                        onChange={onWordChange}
                    />
                    <Select
                        isClearable={true}
                        placeholder="Order by"
                        options={orderByOptions}
                        onChange={onOrderByChange}
                    />
                    <Select placeholder="Regions" options={regionOptions} onChange={onRegionChange} isMulti />
                    <Select placeholder="Schools" options={schoolOptions} onChange={onSchoolChange} isMulti />
                </>
            )}
        </section>
    )
}
