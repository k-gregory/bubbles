import style from "./style.scss"
import React from 'react'
import PropTypes from 'prop-types'

//TODO:Is deposit currency really euro, and selected amount in dollar?

export const NavBar = (props)=>{
    const dollarText = props.deposit.toFixed(2);

    return (
        <div className={style.navBar}>
            <div className='flex-filler'/>
            <div className={style.balance}>
                <div className={style.balanceCount}>${dollarText}</div>
                <div className={style.balanceText}>Balance</div>
            </div>
            <div className={style.deposit}>Deposit</div>
        </div>
    );
};

NavBar.propTypes = {
    deposit: PropTypes.number.isRequired
};