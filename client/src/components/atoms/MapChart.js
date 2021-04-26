import axios from 'axios';
import { geoPath, scaleQuantize, schemeGreens } from 'd3';
import { feature } from 'topojson-client';
import React, { useState, useEffect } from 'react';


function MapChart({data}) {
    const [regions, setRegions] = useState([])

    useEffect(() => {
        axios.get("poet_regions_topo.json")
            .then(topoFile => {
                if (topoFile.status !== 200) {
                    console.log(`There was a problem: ${topoFile.status}`)
                    return
                }
                const mapData = topoFile.data;
                setRegions(feature(mapData, mapData.objects.regions).features)
            })
    }, [regions, setRegions])


    const color = scaleQuantize([1, 600], schemeGreens[9]);
    const recordColors = new Map();
    data.forEach(record => {
        recordColors.set(record.region, color(record.count_poet));
    });

    return (
        <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
            <g className="states">
                {
                    regions.map((d, i) => (
                        <path
                            key={ `path-${ i }` }
                            d={ geoPath()(d) }
                            className="region"
                            fill={ `${recordColors.get(d.id)}` }
                            stroke="#FFFFFF"
                            strokeWidth={ 0.5 }
                        />
                    ))
                }
            </g>
        </svg>
    )
}

export default MapChart
