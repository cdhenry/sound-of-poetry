import React, { useCallback, useEffect, useState } from 'react';

import MapChart from '../../components/atoms/MapChart';
import { IMap } from '../../interfaces/map';
import { PoetService, poetService } from '../../services/poet';
import MapTemplate from '../../templates/Map';
import Loading from '../Loading';
import {IGetPoemsQuery, IPoemListItem, IPoemTag} from "../../interfaces/poem";
import {poemService, PoemService} from "../../services/poem";
import MapFilters from "./Filters";

export default function Map(): JSX.Element {
    const _poemService: PoemService = poemService
    const _mapService: PoetService = poetService
    const [hasError, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as IPoemListItem[])
    const [data, setData] = useState([] as IMap[])
    const [getPoemQuery, setGetPoemQuery] = useState({} as IGetPoemsQuery)
    const [total, setTotal] = useState(0)
    const limit=20;

    const getMapData = useCallback(async () => {
        try {
            setIsLoading(true)
            let data = await _mapService.getCountPoetsByRegion()
            setData(data)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }, [_mapService])

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

    const handleFilterChange = async (selectedOptions: IGetPoemsQuery) => {
        setGetPoemQuery({ ...getPoemQuery, ...selectedOptions })
        await getList(0, { ...getPoemQuery, ...selectedOptions })
    }

    useEffect(() => {
        if (!data.length) getMapData()
    }, [getMapData, data.length])

    return (
        <MapTemplate
            content={
                <>
                    <MapFilters handleFilterChange={handleFilterChange} />
                    {isLoading ? <Loading /> : !hasError ? <MapChart data={data} /> : 'Error'}
                    {/*TODO(danom): implement pretty error atom*/}
                </>

            }
        />
    )
}
