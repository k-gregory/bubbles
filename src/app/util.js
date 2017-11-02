//Use for countdown, takes number of seconds/minutes and returns suitable for "MM:SS"
export function pad(t){
    return t < 10 ? "0"+t : t.toString();
}

export const dollarFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

export const percentFormat = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
});