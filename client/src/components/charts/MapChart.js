import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function MapChart({ data }) {
    console.log(data);
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 500;
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.region))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.count_poet)])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        .tickValues(data.region)
                        .tickSizeOuter(0)
                );

            const y1Axis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s"))
                    .call((g) => g.select(".domain").remove())
                    .call((g) =>
                        g.append("text")
                            .attr("x", -margin.left)
                            .attr("y", 10)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "start")
                            .text(data.y1)
                    );

            svg.select(".x-axis").call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-65)"
                });

            svg.select(".y-axis").call(y1Axis);

            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d.region))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y1(d.count_poet))
                .attr("height", (d) => y1(0) - y1(d.count_poet));
        }
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default MapChart;