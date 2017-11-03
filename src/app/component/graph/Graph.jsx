import React from 'react'

import style from "./style.scss"

import * as d3 from 'd3'

/*
const resize = ()=> {
    const div = d3.select(this.container);
    const svg = d3.select(this.svg);

    const realWidth = parseInt(div.style('width'), 10);
    const realHeight = parseInt(div.style('height'), 10);

    console.log({realWidth});

svg
    .attr('width', realWidth)
    .attr('height', realHeight)
};
resize();
*/

export class Graph extends React.PureComponent {
    componentDidMountRefactor() {
        const div = d3.select(this.container);
        const svg = d3.select(this.svg);

        const realWidth = parseInt(div.style('width'), 10);
        const realHeight = parseInt(div.style('height'), 10);

        svg
            .attr('width', realWidth)
            .attr('height', realHeight);

        var n = 40,
            random = d3.randomNormal(0, .2),
            data = d3.range(n).map(random);
        var margin = {top: 20, right: 20, bottom: 20, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain([0, n - 1])
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0]);
        var area = d3.area()
            .x(function (d, i) {
                return x(i);
            })
            .y1(function (d, i) {
                return y((d + 1) / 2);
            });
        g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x));
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
        g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(data)
            .attr("class", style.line)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .on("start", tick);

        function tick() {
            // Push a new data point onto the back.
            data.push(random());
            // Redraw the line.
            d3.select(this)
                .attr("d", area)
                .attr("transform", null);
            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(-1) + ",0)")
                .transition()
                .on("start", tick);
            // Pop the old data point off the front.
            data.shift();
        }
    }

    componentDidMount() {
        const div = d3.select(this.container);
        const svg = d3.select(this.svg);
        const g = svg.append("g");

        const width = parseInt(div.style('width'), 10);
        const height = parseInt(div.style('height'), 10);
        svg
            .attr('width', width)
            .attr('height', height);

        const n = 40;
        const random = d3.randomNormal(0, 0.2);
        const data = d3.range(n).map(random);

        var x = d3.scaleLinear()
            .domain([0, n - 1])
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0]);

        var area = d3.area()
        //TODO: Must hide new nodes to avoid wiggle
            .curve(d3.curveBasis)
            .x(function (d, i) {
                return x(i);
            })
            .y1(function (d) {
                return y((d + 1) / 2);
            });

        area.y0(y(0));

        g.append("path")
            .datum(data)
            .attr('class', style.line)
            .attr("fill", "url(#Gradient2)")
            .attr("d", area)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .on("start", tick);

        function tick() {
            data.push(random());

            d3.select(this)
                .attr("d", area)
                .attr("transform", null);

            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(-1) + ",0)")
                .transition()
                .on("start", tick);
            // Pop the old data point off the front.
            data.shift();
        }
    }

    render() {
        return (
            <div ref={r => this.container = r} className={style.graph}>
                <svg ref={r => this.svg = r}>
                    <defs>
                        <linearGradient id="Gradient1">
                            <stop className="stop1" offset="0%"/>
                            <stop className="stop3" offset="100%"/>
                        </linearGradient>
                        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#FFA12A" stopOpacity="0.7"/>
                            <stop offset="100%" stopColor="black" stopOpacity="0"/>
                        </linearGradient>
                        <style
                            type="text/css">{"<![CDATA[ #rect1 { fill: url(#Gradient1); } .stop1 { stop-color: #FFA12A; } .stop3 { stop-opacity: 100%; }]]>"}</style>
                    </defs>
                </svg>
            </div>
        );
    }
}