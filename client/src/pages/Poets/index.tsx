import React, { useCallback, useEffect, useState } from 'react'

import { IGetPoetsQuery, IPoetListItem } from '../../interfaces/poet' //, IPoemTag 
//import { IGetPoemsQuery, IPoemListItem } from '../../interfaces/poem' //, IPoemTag 
import { PoetService, poetService } from '../../services/poet'
import PaginateTemplate from '../../templates/Paginate'
import Loading from '../Loading'
import PoetFilters from './Filters'
import PoetsList from './PoetsList'

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
            const data = await _poetService.getPoets({ limit, pageNumber })

            // const tags = (await _poetService.getTags({
            //     poemIds: data.items.map((item) => (item as IPoetListItem).id)
            // })) as IPoemTag[]

            // data.items.forEach(
            //     (item) =>
            //         ((item as IPoetListItem).tags = tags
            //             .filter((tag) => tag.poem_id === (item as IPoetListItem).id)
            //             .map((tag) => tag.name))
            // )

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
                {isLoading ? <Loading /> : <PoetsList list={list} />}
            </PaginateTemplate>
            )
        </>
    )
}

//<PoemFilters handleFilterChange={handleFilterChange} />