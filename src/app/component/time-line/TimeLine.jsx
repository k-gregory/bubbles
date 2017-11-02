import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.scss'

export const timeWidths = [
  "1Y", "3M", "1M", "1D", "4H", "1H", "30m", "15m", "5m", "2m", "1m"
];

export const TimeLine = (props)=>{
    const widthSelections = timeWidths.map((w,i)=>(
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

            <div className={style.currentDate}>01:24</div>
        </div>
    );
};

TimeLine.propTypes = {
    selectedWidth: PropTypes.string.isRequired
};