import React, { useCallback, useEffect, useState } from 'react'
import Select, { OptionsType, OptionTypeBase } from 'react-select'
import AsyncSelect from 'react-select/async'

import { ILibraryClassFilters } from '../../interfaces/filters'
import { ISelectOption } from '../../interfaces/shared'
import { PoemService, poemService } from '../../services/poem'
import { PoetService, poetService } from '../../services/poet'
import { WordService, wordService } from '../../services/word'

export default function LibraryPoemFilters(props: ILibraryClassFilters): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100'
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const [tagOptions, setTagsOptions] = useState([] as ISelectOption[])
    const [isLoading, setIsLoading] = useState(true)

    const getTags = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = (await _poemService.getTags()) as ISelectOption[]
            setTagsOptions(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poemService])

    const loadTitles = (title: string, callback: any) => {
        if (title.length > 2) _poemService.getTitles({ title }).then((data) => callback(data))
    }

    const loadPoets = (name: string, callback: any) => {
        if (name.length > 2) _poetService.getPoetNames({ name }).then((data) => callback(data))
    }

    const loadWords = (lemma: string, callback: any) => {
        if (lemma.length > 2) _wordService.getLemmas({ lemma }).then((data) => callback(data))
    }

    const onTitleChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ poemId: selectOption?.value as number })
    }

    const onPoetChange = (poets: OptionsType<any>) => {
        props.handleFilterChange({ poets: poets.map((item) => item.value) })
    }

    const onTagChange = (tags: OptionsType<any>) => {
        props.handleFilterChange({ tags: tags.map((item) => item.value) })
    }

    const onWordChange = (words: OptionsType<any>) => {
        props.handleFilterChange({ words: words.map((item) => item.value) })
    }

    const noOptionsMessage = () => 'Type to populate options'

    useEffect(() => {
        getTags()
    }, [getTags])

    return isLoading ? (
        <div className="flex justify-center">Loading...</div>
    ) : (
        <section className={defaultClassName}>
            <>
                <AsyncSelect
                    placeholder="Titles"
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
            </>
        </section>
    )
}
