import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

export const BidAmountSelector = (props)=>{
    return (
      <div className={style.bidAmountSelector}>
          <div className={style.info}>
              <div className='text-description'>Amount</div>
              <div className='flex-filler'/>
              <div className='text-value'>${props.amount}</div>
          </div>
          <div className={style.vline}/>
          <div className={style.modButtons}>
              <a href='#' className={style.minus}>-</a>
              <div className={style.hline}/>
              <a href='#' className={style.plus}>
                  +
              </a>
          </div>
      </div>
    );
};

BidAmountSelector.propTypes = {
    amount: PropTypes.number.isRequired,
    onAmountIncrement: PropTypes.func,
    onAmountDecrement: PropTypes.func
};