import React, { useCallback, useEffect, useState } from 'react';

import MapChart from '../../components/atoms/MapChart';
import { IMap } from '../../interfaces/map';
import { PoetService, poetService } from '../../services/poet';
import MapTemplate from '../../templates/Map';
import Loading from '../Loading';

export default function Map(): JSX.Element {
    const _mapService: PoetService = poetService
    const [hasError, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([] as IMap[])
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

    useEffect(() => {
        if (!data.length) getMapData()
    }, [getMapData, data.length])

    return (
        <MapTemplate
            header={'Map'}
            content={
                isLoading ? <Loading /> : !hasError ? <MapChart data={data} /> : 'Error' //TODO(danom): implement pretty error atom
            }
        />
    )
}
