const initialState = 1000;

const updateBalanceT = "UPDATE_BALANCE";

export function updateBalance(change) {
    return {
        type: updateBalanceT,
        change
    }
}

export function balanceReducer(state = initialState, action){
    switch (action.type) {
        case updateBalanceT:
            return state + action.change;
        default:
            return state;
    }
}