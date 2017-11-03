import React from 'react'

import style from './style.scss'

import {Graph} from "../graph/Graph";
import {NavBar} from "../navbar/NavBar";
import {TimeLine} from "../time-line/TimeLine";
import {TradePanel} from "../trade-panel/TradePanel";

export const App = (props)=>{
    return (
        <div className={style.app}>
            <NavBar deposit={993}/>
            <div className={style.appContent}>
                <Graph/>
                <TradePanel bought={true} profit={2.15} showTimeLine={true} expiry={42} amount={200}/>
            </div>
            <TimeLine selectedWidth={'1m'}/>
        </div>
    )
};