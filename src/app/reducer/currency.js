const initialState = {
    value: 0
};

const updateCurrencyT = "UPDATE_CURRENCY";

export function updateCurrency(newCurrency) {
    return {
        type: updateCurrencyT,
        newCurrency
    }
}

export function currencyReducer(state = initialState, action) {
    switch (action.type) {
        case updateCurrencyT:
            return {
                value: action.newCurrency
            };
        default:
            return state;
    }
}