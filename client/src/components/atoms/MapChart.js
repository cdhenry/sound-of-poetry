import axios from 'axios';
import { geoPath, scaleQuantize, schemeGreens, select, selectAll } from 'd3';
import { feature } from 'topojson-client';
import React, { useState, useEffect } from 'react';


function MapChart({data}) {
    const [regions, setRegions] = useState([])

    useEffect(() => {
        if (regions.length === 0) {
            axios.get("poet_regions_topo.json")
                .then(topoFile => {
                    if (topoFile.status !== 200) {
                        console.log(`There was a problem: ${topoFile.status}`)
                        return
                    }
                    const mapData = topoFile.data;
                    setRegions(feature(mapData, mapData.objects.regions).features)
                });
        }
    }, [regions, setRegions])

    const color = scaleQuantize([1, 100], schemeGreens[9]);
    const recordColors = new Map();
    data.forEach(record => {
        recordColors.set(record.region, [record.count_poet, color(record.count_poet)]);
    });
    regions.forEach(region => {
        if (recordColors.has(region.id)) {
            region.color = recordColors.get(region.id)[1];
        } else {
            recordColors.set(region.id, [0, "#FFFFFF"]);
            region.color = "#FFFFFF"
        }
    })

    const handleOuterClick = () => {
        selectAll("text")
            .style("visibility", "hidden");
    }

    const handleRegionClick = (i) => {
        select("text")
            .attr("class","regionText")
            .attr("x", 10)
            .attr("y", 10)
            .attr("dy", "0.35em")
            .attr("width", 180)
            .attr("height", 35)
            .attr("fill", "#000000")
            .text(regions[i].id + ": " + recordColors.get(regions[i].id)[0])
            .transition()
            .duration(900)
            .style("visibility", "visible");
    }

    // const handleRegionMouseLeave = () => {
    //     select(".regionText")
    //         .remove()
    //
    //     select(".tooltip")
    //         .transition()
    //         .duration(900)
    //         .style("visibility", "hidden");
    // }

    return (
        <svg
            width={ 800 }
            height={ 450 }
            viewBox="0 0 800 450"
            onClick={ () => handleOuterClick() }
        >
            <g className="map">
                {
                    regions.map((d, i) => (
                        <path
                            key={ `path-${ i }` }
                            d={ geoPath()(d) }
                            className="region"
                            fill={ `${ d.color }` }
                            stroke="#FFFFFF"
                            strokeWidth={ 0.5 }
                            onClick={ () => handleRegionClick(i) }
                        />
                    ))
                }
            </g>
            <g className = "text">
                {
                    <text
                        className={"tooltip"}
                        x={0}
                        y={0}
                        width={200}
                        height={50}
                        fill={"#CCCCCC"}
                    />
                }
            </g>
        </svg>
    )
}

export default MapChart
