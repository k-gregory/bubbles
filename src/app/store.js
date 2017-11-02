import {createStore, combineReducers} from 'redux'
import {balanceReducer} from './reducer/balance'

const reducer = combineReducers({
    balance: balanceReducer
});

export const store = createStore(reducer);