import React, { useCallback, useEffect, useState } from 'react';

import { IGetPoemsQuery, IPoemListItem, IPoemTag } from '../../interfaces/poem';
import { PoemService, poemService } from '../../services/poem';
import PaginateTemplate from '../../templates/Paginate';
import Loading from '../Loading';
import PoemFilters from './Filters';
import PoemsList from './PoemsList';

export default function Poems(): JSX.Element {
    const _poemService: PoemService = poemService
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as IPoemListItem[])
    const [total, setTotal] = useState(0)
    const [getPoemQuery, setGetPoemQuery] = useState({} as IGetPoemsQuery)
    const limit = 20

    const handlePageChange = async (pageNumber: number) => {
        await getList(pageNumber)
    }

    const handleFilterChange = async (selectedOptions: IGetPoemsQuery) => {
        setGetPoemQuery({ ...getPoemQuery, ...selectedOptions })
        await getList(0, { ...getPoemQuery, ...selectedOptions })
    }

    const getList = useCallback(async (pageNumber: number = 0, selectedOptions?: IGetPoemsQuery) => {
        try {
            setIsLoading(true)
            const data = await _poemService.getPoems({ limit, pageNumber }, selectedOptions)

            const tags = (await _poemService.getTags({
                poemIds: data.items.map((item) => (item as IPoemListItem).id)
            })) as IPoemTag[]

            data.items.forEach(
                (item) =>
                    ((item as IPoemListItem).tags = tags
                        .filter((tag) => tag.poem_id === (item as IPoemListItem).id)
                        .map((tag) => tag.name))
            )

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
            <PoemFilters handleFilterChange={handleFilterChange} />
            <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                {isLoading ? <Loading /> : <PoemsList list={list} />}
            </PaginateTemplate>
            )
        </>
    )
}
