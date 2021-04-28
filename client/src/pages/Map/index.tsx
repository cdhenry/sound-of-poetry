import React, { useCallback, useEffect, useState } from 'react';

import MapChart from '../../components/atoms/MapChart';
import {IGetRegionsQuery, IMap} from '../../interfaces/map';
import MapTemplate from '../../templates/Map';
import Loading from '../Loading';
import {poemService, PoemService} from "../../services/poem";
import MapFilters from "./Filters";

export default function Map(): JSX.Element {
    const _poemService: PoemService = poemService
    const [hasError, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([] as IMap[])
    const [getRegionsQuery, setGetRegionsQuery] = useState({} as IGetRegionsQuery)

    const getRegions = useCallback(async (selectedOptions?: IGetRegionsQuery) => {
        try {
            setIsLoading(true)
            let data = await _poemService.getRegions(selectedOptions)
            setData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleFilterChange = async (selectedOptions: IGetRegionsQuery) => {
        setGetRegionsQuery({ ...getRegionsQuery, ...selectedOptions })
        await getRegions({ ...getRegionsQuery, ...selectedOptions })
    }

    useEffect(() => {
        if (!data.length) getRegions()
    }, [getRegions, data.length])

    return (
        <MapTemplate
            content={
                <>
                    <MapFilters handleFilterChange={handleFilterChange} />
                    {isLoading ? <Loading /> : !hasError ? <MapChart data={data} /> : 'Error'}
                </>

            }
        />
    )
}
