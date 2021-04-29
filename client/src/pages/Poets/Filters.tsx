import React, { useCallback, useEffect, useState } from 'react';
import Select, { OptionsType, OptionTypeBase } from 'react-select';
import AsyncSelect from 'react-select/async';

import { PoetOrderByEnum } from '../../enums/orderBy';
import { IPoetFiltersProps } from '../../interfaces/poet';
import { ISelectOption } from '../../interfaces/shared';
import { PoetService, poetService } from '../../services/poet';
import Loading from '../Loading';

export default function PoetFilters(props: IPoetFiltersProps): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100 w-11/12'
    const _poetService: PoetService = poetService
    const [regionOptions, setRegionOptions] = useState([] as ISelectOption[])
    const [schoolOptions, setSchoolOptions] = useState([] as ISelectOption[])
    const [isLoading, setIsLoading] = useState(true)
    const orderByOptions: OptionTypeBase[] = [
        { value: PoetOrderByEnum.Author, label: 'Author' },
        { value: PoetOrderByEnum.Region, label: 'Region' },
        { value: PoetOrderByEnum.School, label: 'School' },
        { value: PoetOrderByEnum.MostVerbose, label: 'Most Verbose' },
        { value: PoetOrderByEnum.MostTerse, label: 'Most Terse' },
        { value: PoetOrderByEnum.WidestVocabulary, label: 'Widest Vocabulary' },
        { value: PoetOrderByEnum.SmallestVocabulary, label: 'Smallest Vocabulary' }
    ]

    const thisCentury = Math.trunc(new Date().getFullYear() / 100) * 100 + 100
    let spanCentury = thisCentury
    let spanEndOptions = [] as ISelectOption[]
    while (spanCentury >= 0) {
        spanEndOptions.push({
            value: spanCentury,
            label: spanCentury === thisCentury ? 'Present' : spanCentury.toString()
        })
        spanCentury -= 100
    }
    let spanStartOptions = [] as ISelectOption[]
    spanCentury = 0
    while (spanCentury < thisCentury) {
        spanStartOptions.push({ value: spanCentury, label: spanCentury.toString() })
        spanCentury += 100
    }

    const getDropdowns = useCallback(async () => {
        try {
            setIsLoading(true)
            const regionData = await _poetService.getRegionsDropdown()
            const schoolData = await _poetService.getSchoolsDropdown()
            setRegionOptions(regionData)
            setSchoolOptions(schoolData)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poetService])

    const loadPoets = (name: string, callback: any) => {
        if (name.length > 2) _poetService.getPoetNames({ name }).then((data) => callback(data))
    }

    const onPoetChange = (poets: OptionsType<any>) => {
        props.handleFilterChange({ poets: poets.map((item) => item.value) })
    }

    const onRegionChange = (regions: OptionsType<any>) => {
        props.handleFilterChange({ regions: regions.map((item) => item.value) })
    }

    const onSchoolChange = (schools: OptionsType<any>) => {
        props.handleFilterChange({ schools: schools.map((item) => item.value) })
    }

    const onSpanStartChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ yob: selectOption?.value as number })
    }

    const onSpanEndChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ yod: selectOption?.value as number })
    }

    const onOrderByChange = (selectOption: OptionTypeBase | null) => {
        props.handleFilterChange({ orderBy: selectOption?.value })
    }

    const noOptionsMessage = () => 'Type to populate options'

    useEffect(() => {
        getDropdowns()
    }, [])

    return isLoading ? (
        <Loading />
    ) : (
        <section className={defaultClassName}>
            <AsyncSelect
                isMulti
                placeholder="Poets"
                noOptionsMessage={noOptionsMessage}
                loadOptions={loadPoets}
                onChange={onPoetChange}
            />
            <Select placeholder="Regions" options={regionOptions} onChange={onRegionChange} isMulti />
            <Select placeholder="Schools" options={schoolOptions} onChange={onSchoolChange} isMulti />
            <Select placeholder="Order by" isClearable={true} options={orderByOptions} onChange={onOrderByChange} />
            <Select
                placeholder="Span Start"
                isClearable={true}
                options={spanStartOptions}
                onChange={onSpanStartChange}
            />
            <Select placeholder="Span End" isClearable={true} options={spanEndOptions} onChange={onSpanEndChange} />
        </section>
    )
}
