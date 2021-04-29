import React, { useCallback, useEffect, useState } from 'react'
import { OptionsType } from 'react-select'
import AsyncSelect from 'react-select/async'

import { IPoetFiltersProps } from '../../interfaces/poet'
import { ISelectOption } from '../../interfaces/shared'
import { PoetService, poetService } from '../../services/poet'
import Loading from '../Loading'

export default function PoetFilters(props: IPoetFiltersProps): JSX.Element {
    const defaultClassName =
        'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 border-gray-500 border-2 rounded bg-indigo-100 w-11/12'
    const _poetService: PoetService = poetService
    const [tagOptions, setTagsOptions] = useState([] as ISelectOption[])
    const [isLoading, setIsLoading] = useState(true)

    const getNames = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = (await _poetService.getNames()) as ISelectOption[]
            setTagsOptions(data)
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

    const noOptionsMessage = () => 'Type to populate options'

    useEffect(() => {
        getNames()
    }, [getNames])

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
            <div></div> {/* div for grid spacing */}
        </section>
    )
}
