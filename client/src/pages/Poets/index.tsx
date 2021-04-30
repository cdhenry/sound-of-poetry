import React, { useCallback, useEffect, useState } from 'react';

import { IGetPoetsQuery, IPoetListItem } from '../../interfaces/poet';
import { PoetService, poetService } from '../../services/poet';
import PaginateTemplate from '../../templates/Paginate';
import Loading from '../Loading';
import PoetFilters from './PoetFilters';
import PoetsList from './PoetsList';

export default function Poets(): JSX.Element {
    const _poetService: PoetService = poetService
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as IPoetListItem[])
    const [total, setTotal] = useState(0)
    const [getPoetQuery, setGetPoetQuery] = useState({} as IGetPoetsQuery)
    const limit = 20

    const handlePageChange = async (pageNumber: number) => {
        await getList(pageNumber)
    }

    const handleFilterChange = async (selectedOptions: IGetPoetsQuery) => {
        setGetPoetQuery({ ...getPoetQuery, ...selectedOptions })
        await getList(0, { ...getPoetQuery, ...selectedOptions })
    }

    const getList = useCallback(async (pageNumber: number = 0, selectedOptions?: IGetPoetsQuery) => {
        try {
            setIsLoading(true)

            const data = await _poetService.getPoets({ limit, pageNumber }, selectedOptions)

            setTotal(data.total)
            setList(data.items)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <>
            <PoetFilters handleFilterChange={handleFilterChange} />
            <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                {isLoading ? (
                    <Loading />
                ) : !list.length ? (
                    <div className="flex justify-center">No poets exist for this filter set</div>
                ) : (
                    <PoetsList list={list} />
                )}
            </PaginateTemplate>
        </>
    )
}
