import React from 'react'

import PropTypes from 'prop-types'

import style from "./style.scss"

import * as d3 from 'd3'

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [{
                time: Date.now(),
                value: props.currency
            }],
            dismensions: {
                width: 1,
                height: 1
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.currency !== newProps.currency) {
            const now = Date.now();
            let currencies = this.state.currencies.filter(d => d.time > (now - this.props.shownTime));
            currencies.push({
                time: now,
                value: newProps.currency
            });
            this.setState({currencies});
            this.x.domain([0, currencies.length - 1]);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.dismensions !== prevState.dismensions) {
            this.x.range([0, this.state.dismensions.width / 2]);
            this.y.range([this.state.dismensions.height, 0]);

        }


        const d = this.state.currencies;
        const l = d.length;

        this.p.datum(this.state.currencies);
        this.p.attr('d', this.area);

        const value = d[l - 1].value;
        const valueY = this.y(value);

        const wantedY = this.state.dismensions.height / 2;
        const needTransform = wantedY - valueY;

        this.area.y0(this.state.dismensions.height - needTransform);
        this.p.attr('transform', `translate(0,${needTransform})`)
    }

    updateDismensions() {
        this.setState({
            dismensions: {
                width: parseInt(this.div.style('width'), 10),
                height: parseInt(this.div.style('height'), 10)
            }
        });
    }

    componentDidMount() {
        this.div = d3.select(this.container);
        const svg = d3.select(this.svg);
        const g = svg.append("g");

        this.updateDismensions();

        const f = () => {
            console.log("resize");
            this.updateDismensions();
        };
        d3.select(window).on('resize', f);
        f();

        this.x = d3.scaleLinear();
        this.y = d3.scaleLinear().domain([0, 1]);

        this.area = d3.area()
            .curve(d3.curveCardinal)
            .x((d, i) => this.x(i))
            .y1((d) => this.y(d.value));

        this.p = g.append("path")
            .datum(this.state.currencies)
            .attr('class', style.line)
            .attr("fill", "url(#Gradient2)")
            .attr("d", this.area)
    }

    render() {
        return (
            <div ref={r => this.container = r} className={style.graph}>
                <svg width={this.state.dismensions.width} height={this.state.dismensions.height}
                     ref={r => this.svg = r}>
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

Graph.propTypes = {
    currentTime: PropTypes.number.isRequired,
    currency: PropTypes.number.isRequired,
    shownTime: PropTypes.number.isRequired
};