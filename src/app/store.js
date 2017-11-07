import {combineReducers, createStore} from 'redux'
import {balanceReducer} from './reducer/balance'
import {gameLoopReducer, startGameLoop} from "./game-loop/index";
import {provideCurrency} from "./service/currency-service/index";
import {currencyReducer, updateCurrency} from "./reducer/currency";

const reducer = combineReducers({
    balance: balanceReducer,
    gameLoop: gameLoopReducer,
    currency: currencyReducer
});

export const store = createStore(reducer);

provideCurrency((currency) => {
    store.dispatch(updateCurrency(currency));
}, 0.5, 0, 0.06);
startGameLoop(store);