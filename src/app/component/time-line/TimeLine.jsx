import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.scss'
import {dateFormat} from "../../util";

export const timeWidths = [
  "1Y", "3M", "1M", "1D", "4H", "1H", "30m", "15m", "5m", "2m", "1m"
];

export class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

        this.intervalId = null;

        //TODO: Is this format suitable?
        this.dateFormat = new Intl.DateTimeFormat("en", {
            hour12: false,

            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({date: new Date()})
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const props = this.props;
        const date = this.dateFormat.format(this.state.date);

        const widthSelections = timeWidths.map((w, i) => (
            <a href="#" key={i} className={classNames(
                style.timeSelection, {[style.activeTimeSelection]: w === props.selectedWidth}
            )}>{w}</a>
        ));

        return (

            <div className={style.timeLine}>
                <div>G1 {/*TODO add icon*/}</div>
                <div>G2 {/*TODO add icon*/}</div>

                <a href="#" className={style.timeSelection}>- {/*TODO add icon*/}</a>
                {widthSelections}
                <a href="#" className={style.timeSelection}>+ {/*TODO add icon*/}</a>

                <div className={style.currentDate}>{date}</div>
            </div>
        );
    }
}

TimeLine.propTypes = {
    selectedWidth: PropTypes.string.isRequired
};