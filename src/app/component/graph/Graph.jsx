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
            dimensions: {
                width: 1,
                height: 1
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.currency !== newProps.currency) {
            const now = Date.now();
            const lastTime = now - this.props.shownTime;

            const currencies = [{
                time: now,
                value: newProps.currency
            }];
            for (let i = this.state.currencies.length - 1; i >= 0; i--) {
                currencies.push(this.state.currencies[i]);
                if (this.state.currencies[i].time < lastTime) break;
            }
            currencies.reverse();

            this.setState({currencies});
            this.x.domain([now - this.props.shownTime, now]);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.dimensions !== prevState.dimensions) {
            this.x.range([0, this.state.dimensions.width / 2]);
            this.y.range([this.state.dimensions.height, 0]);

        }

        const now = Date.now();
        this.x.domain([now - this.props.shownTime, now]);

        const realData = this.state.currencies;
        const l = realData.length;

        const last = realData[l - 1];

        const drawnData = [...realData, {
            time: now,
            value: last.value
        }];
        this.p.datum(drawnData);
        this.p.attr('d', this.area);

        const lastValueY = this.y(last.value);

        const wantedY = this.state.dimensions.height / 2;
        const needTransform = wantedY - lastValueY;

        this.area.y0(this.state.dimensions.height - needTransform);
        this.p.attr('transform', `translate(0,${needTransform})`)
    }

    updateDimensions() {
        this.setState({
            dimensions: {
                width: parseInt(this.div.style('width'), 10),
                height: parseInt(this.div.style('height'), 10)
            }
        });
    }

    componentDidMount() {
        this.div = d3.select(this.container);
        const svg = d3.select(this.svg);
        const g = svg.append("g");

        this.updateDimensions();

        const f = () => {
            console.log("resize");
            this.updateDimensions();
        };
        //FIXME: May interfere with other components
        d3.select(window).on('resize', f);
        f();

        this.x = d3.scaleTime();
        this.y = d3.scaleLinear().domain([0, 1]);

        this.area = d3.area()
            .curve(d3.curveCardinal)
            .x((d, i) => this.x(d.time))
            .y1((d) => this.y(d.value));

        this.p = g.append("path")
            .datum(this.state.currencies)
            .attr('class', style.line)
            .attr("fill", "url(#Gradient2)")
            //.attr("clip-path", "url(#cut-off-bottom)")
            .attr("d", this.area)
    }

    componentWillUnmount() {
        //FIXME: May interfere with other components
        d3.select(window).on('resize', null)
    }

    render() {
        const {width, height} = this.state.dimensions;

        return (
            <div ref={r => this.container = r} className={style.graph}>
                <svg width={width} height={height} ref={r => this.svg = r}>
                    <defs>
                        <clipPath id="cut-off-bottom">
                            <rect x="0" y="0" width={width / 2} height={height}/>
                        </clipPath>
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