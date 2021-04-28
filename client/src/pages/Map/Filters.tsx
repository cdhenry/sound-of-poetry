import React, { useCallback, useEffect, useState } from 'react';
import Select, { OptionsType } from 'react-select';
import AsyncSelect from 'react-select/async';

import Loading from '../Loading';
import {IMapFiltersProps} from "../../interfaces/map";
import {ISelectOption} from "../../interfaces/shared";
import {poemService, PoemService} from "../../services/poem";
import {wordService, WordService} from "../../services/word";

export default function MapFilters(props: IMapFiltersProps): JSX.Element {
    const defaultClassName =
        'grid grid-cols-1 md:grid-cols-2 content-center gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100 w-11/12';
    const _poemService: PoemService = poemService;
    const _wordService: WordService = wordService;
    const [tagOptions, setTagsOptions] = useState([] as ISelectOption[]);
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

    const loadWords = (lemma: string, callback: any) => {
        if (lemma.length > 2) _wordService.getLemmas({ lemma }).then((data) => callback(data))
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
        <Loading />
    ) : (
        <section className={defaultClassName}>
            <Select placeholder="Topics" options={tagOptions} onChange={onTagChange} isMulti />
            <AsyncSelect
                isMulti
                placeholder="Words"
                noOptionsMessage={noOptionsMessage}
                loadOptions={loadWords}
                onChange={onWordChange}
            />
        </section>
    )
}
