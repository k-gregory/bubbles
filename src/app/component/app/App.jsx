import React from 'react'

import style from './style.scss'

import {TimeLine} from "../time-line/TimeLine";
import {Graph} from "../../connected-component/Graph";
import {TradePanel} from "../../connected-component/TradePanel";
import {NavBar} from "../../connected-component/NavBar";

const shownTime = 1000 * 10; //10 seconds

export const App = (props)=>{
    return (
        <div className={style.app}>
            <NavBar/>
            <div className={style.appContent}>
                <Graph shownTime={shownTime}/>
                <TradePanel bought={false} profit={2.15} showTimeLine={true} expiry={42} amount={200}/>
            </div>
            <TimeLine selectedWidth={'1m'}/>
        </div>
    )
};