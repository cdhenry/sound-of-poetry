import { geo, geoPath } from 'd3';
import { feature } from 'topojson-client';
import React, { useState, useEffect } from 'react';


const MapChart = () => {
    const [geographies, setGeographies] = useState([])

    useEffect(() => {
        fetch("/poet_regions_topo.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return
                }
                response.json().then(world => {
                    setGeographies(feature(world, world.objects.regions).features)
                })
            })
    }, [])

    return (
        <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
            <g className="states">
                {
                    geographies.map((d,i) => (
                        <path
                            key={ `path-${ i }` }
                            d={ geoPath()(d) }
                            className="region"
                            fill={ `rgba(100,50,56,${ 1 / geographies.length * i})` }
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
