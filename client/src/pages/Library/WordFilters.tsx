// import React from 'react';

// import { ILibraryClassFilters } from '../../interfaces/filters';

// export default function LibraryWordFilters(props: ILibraryClassFilters): JSX.Element {
//     const defaultClassName = 'grid grid-cols-4 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100'

//     return <section className={defaultClassName}>Test</section>
// }

import React, { useCallback, useEffect, useState } from 'react'
import Select, { OptionsType, OptionTypeBase } from 'react-select'
import AsyncSelect from 'react-select/async'

import { ILibraryClassFilters } from '../../interfaces/filters'
import { ISelectOption } from '../../interfaces/shared'
import { WordService, wordService } from '../../services/word'

export default function LibraryPoemFilters(props: ILibraryClassFilters): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100'
    const _wordService: WordService = wordService
    const [freqWordOptions, setFreqOptions] = useState([] as ISelectOption[])
    const [imageWordOptions, setImageOptions] = useState([] as ISelectOption[])
    const [videoWordOptions, setVideoOptions] = useState([] as ISelectOption[])
    const [isLoading, setIsLoading] = useState(true)

    const getFreq = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = (await _wordService.selectFreqWord()) as ISelectOption[]
            setFreqOptions(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_wordService])
    
    const getImageWord = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = (await _wordService.selectImageWord()) as ISelectOption[]
            setImageOptions(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_wordService])

    const getVideoWord = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = (await _wordService.selectVideoWord()) as ISelectOption[]
            setVideoOptions(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_wordService])

    const onFreqChange = (words: OptionsType<any>) => {
        props.handleFilterChange({ words : words.map((item) => item) })
    }

    const onImageChange = (words: OptionsType<any>) => {
        props.handleFilterChange({ words: words.map((item) => item.value) })
    }

    const onVideoChange = (words: OptionsType<any>) => {
        props.handleFilterChange({ words: words.map((item) => item.value) })
    }

    const noOptionsMessage = () => 'Type to populate options'

    useEffect(() => {
        getFreq()
    }, [getFreq])

    useEffect(() => {
        getImageWord()
    }, [getImageWord])

    useEffect(() => {
        getVideoWord()
    }, [getVideoWord])

    return isLoading ? (
        <div className="flex justify-center">Loading...</div>
    ) : (
        <section className={defaultClassName}>
            <>
               
                <Select placeholder="Freq Words" options={freqWordOptions} onChange={onFreqChange} isMulti />
                <Select placeholder="Has Image"  />
                <Select placeholder="Has Video"  />

            </>
        </section>
    )
}
