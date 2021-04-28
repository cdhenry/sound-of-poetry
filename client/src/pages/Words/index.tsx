import React, { useCallback, useEffect, useState } from 'react'

import { IGetPoemsQuery, IPoemListItem, IPoemTag } from '../../interfaces/poem'
import { IGetWordsQuery, IWord } from '../../interfaces/word'
import { PoemService, poemService } from '../../services/poem'
import { wordService, WordService } from '../../services/word'
import PaginateTemplate from '../../templates/Paginate'
import Loading from '../Loading'
import WordFilters from './Filters'
import PoemFilters from './Filters'
import PoemsList from './WordsList'
import WordsList from './WordsList'

export default function Words(): JSX.Element {
    const _wordService: WordService = wordService
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as IWord[])
    const [total, setTotal] = useState(0)
    const [getPoemQuery, setGetPoemQuery] = useState({} as IGetWordsQuery)
    const limit = 20

    const handlePageChange = async (pageNumber: number) => {
        await getList(pageNumber)
    }

    const handleFilterChange = async (selectedOptions: IGetWordsQuery) => {
        setGetPoemQuery({ ...getPoemQuery, ...selectedOptions })
        await getList(0, { ...getPoemQuery, ...selectedOptions })
    }

    const getList = useCallback(async (pageNumber: number = 0, selectedOptions?: IGetWordsQuery) => {
        try {
            setIsLoading(true)
            const data = await _wordService.getWords({ limit, pageNumber }, selectedOptions)

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
    }, [])

    return (
        <>
            {/* <PoemFilters handleFilterChange={handleFilterChange} />
            <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                {isLoading ? <Loading /> : <PoemsList list={list} />}
            </PaginateTemplate> */}
            <WordFilters handleFilterChange={handleFilterChange} />
            <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                {isLoading ? <Loading /> : <WordsList list={list} />}
            </PaginateTemplate>
            )
        </>
    )
}
