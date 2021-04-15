import React, {useCallback, useEffect, useState} from 'react';
import MapChart from "../../components/charts/MapChart";
import {poetService, PoetService} from "../../services/poet";
import { IMap } from "../../interfaces/map";
import Loading from '../Loading';
import MapTemplate from "../../templates/Map";


export default function Map(): JSX.Element {
    const _mapService: PoetService = poetService
    const [hasData, setHasData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([] as IMap[])
    const getMapData = useCallback(
        async () => {
            try {
                setIsLoading(true);
                let data = await _mapService.getCountPoetsByRegion();
                setData(data);
                setHasData(true);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        },
        [_mapService]
    )

    useEffect(() => {if (!data.length) getMapData()}, [getMapData, data.length])


    return (
        <MapTemplate
            header={"Map"}
            content={
                isLoading ? (
                    <Loading />
                ) : hasData ? (
                    <MapChart data={data} />
                ) : null
            }
        />
    )
}
