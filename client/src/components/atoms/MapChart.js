import axios from 'axios';
import { geoPath, max, scaleLinear, select, selectAll } from 'd3';
import React, { useEffect, useState } from 'react';
import { feature } from 'topojson-client';

function MapChart({ data }) {
    const svgWidth = 1000
    const svgHeight = 500

    const [regions, setRegions] = useState([])

    useEffect(() => {
        if (regions.length === 0) {
            axios.get('poet_regions_topo.json').then((topoFile) => {
                if (topoFile.status !== 200) {
                    console.log(`There was a problem: ${topoFile.status}`)
                    return
                }
                const mapData = topoFile.data
                setRegions(feature(mapData, mapData.objects.regions).features)
            })
        }
    }, [regions, setRegions])

    const domainMax = max(data, (d) => {
        return d.result
    })
    const color = scaleLinear().domain([1, domainMax]).range(['white', 'green'])
    const recordColors = new Map()

    data.forEach((record) => {
        recordColors.set(record.region, [record.result, color(record.result)])
    })

    regions.forEach((region) => {
        if (recordColors.has(region.id)) {
            region.color = recordColors.get(region.id)[1]
        } else {
            recordColors.set(region.id, [0, '#FFFFFF'])
            region.color = '#FFFFFF'
        }
    })

    const handleOuterClick = () => {
        selectAll('text').remove()

        selectAll('rect').remove()
    }

    const handleRegionClick = (i) => {
        let mapBoxW = select('.mapBox').attr('width')
        let mapBoxH = select('.mapBox').attr('height')

        selectAll('text').remove()
        selectAll('rect').remove()

        select('g.statPanel')
            .append('rect')
            .attr('x', 10)
            .attr('y', mapBoxH - 40)
            .attr('width', mapBoxW - 100)
            .attr('height', 35)
            .attr('rx', 5)
            .style('fill', '#DDDDDD')
            .style('visibility', 'visible')

        select('g.statPanel')
            .append('text')
            .attr('class', 'statText')
            .attr('x', 10)
            .attr('y', mapBoxH - 40)
            .attr('width', mapBoxW - 100)
            .attr('height', 35)
            .attr('dy', 25)
            .attr('dx', 350)
            .attr('fill', '#000000')
            .text(regions[i].id + ': ' + recordColors.get(regions[i].id)[0])
            .transition()
            .duration(900)
            .style('visibility', 'visible')
    }

    return (
        <section className="flex items-center flex-col p-2 w-full h-full">
            <svg
                width={svgWidth}
                height={svgHeight}
                className={'mapBox'}
                // onClick={ () => handleOuterClick() }
            >
                <g className="map">
                    {regions.map((d, i) => (
                        <path
                            key={`path-${i}`}
                            cursor={'pointer'}
                            d={geoPath()(d)}
                            className="region"
                            fill={`${d.color}`}
                            stroke="#FFFFFF"
                            strokeWidth={0.5}
                            onClick={() => handleRegionClick(i)}
                        />
                    ))}
                </g>
                <g className="statPanel">
                    <rect className="statPanelBg" />
                </g>
            </svg>
        </section>
    )
}

export default MapChart
