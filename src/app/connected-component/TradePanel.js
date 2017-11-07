import {TradePanel as C} from "../component/trade-panel/TradePanel";
import {connect} from "react-redux";
import {updateBalance} from "../reducer/balance";

export const TradePanel = connect(
    function (state, ownProps) {
        return {
            buyActive: state.balance >= ownProps.amount
        }
    },
    function (dispatch, ownProps) {
        return {
            onBuy: () => {
                dispatch(updateBalance(-ownProps.amount))
            }
        }
    }
)(C);