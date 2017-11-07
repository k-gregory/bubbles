import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import {BidAmountSelector} from "../bid-amount-selector/BidAmountSelector";
import {Progress} from "../progress/Progress";
import classNames from "classnames"
import {dollarFormat, pad, percentFormat} from "../../util"

export const TradePanel = (props)=>{
    const minutes = Math.floor(props.expiry / 60);
    const seconds = props.expiry % 60;

    const profitMoney = dollarFormat.format(props.amount * props.profit);
    const profitPercent = percentFormat.format(props.profit);

    let button;
    const buttonClasses = classNames({
        [style.buyClose]: props.bought,
        [style.buyOpen]: !props.bought,
        "text-disabled": !props.buyActive
    });

    if(props.bought){
        //TODO: Which amount shall be here
        const closeMoney = dollarFormat.format(props.amount * Math.log(props.profit + 1));

        button = (
            <a href='#' className={buttonClasses}>
                <div>close</div>
                <div>{closeMoney}</div>
            </a>
        );
    } else {
        button = <a onClick={() => {
            if (props.buyActive) props.onBuy()
        }} href='#' className={buttonClasses}>open</a>;
    }

    return (
        <div className={style.tradePanel}>
            <div>
                <div className='text-description'>Expiry</div>
                <div className='text-value'>{pad(minutes)}:{pad(seconds)}</div>
                {props.showTimeLine && <Progress completeness={0.5}/>}
            </div>
            <BidAmountSelector amount={props.amount}/>
            <div>
                <div className='text-description'>Max profit</div>
                <span className={style.profitMoney}>{profitMoney}</span>
                <span className={style.profitPercent}>{profitPercent}</span>
            </div>
            {props.bought && (
                <div>
                    <div className='text-description'>Amount</div>
                    <div className='text-value'>${props.amount}</div>
                </div>
            )}
            {button}
        </div>
    );
};

TradePanel.propTypes = {
    expiry: PropTypes.number.isRequired,
    showTimeLine: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
    profit: PropTypes.number.isRequired,
    bought: PropTypes.bool.isRequired,
    onBuy: PropTypes.func.isRequired,
    buyActive: PropTypes.bool.isRequired
};