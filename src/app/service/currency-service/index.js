//Calculates delay before new currency value is emitted
function getCurrencyDelay() {
    return (Math.random() + 0.5) * 200;
}


//Calls callback each time when currency changes, params: new currency
export function provideCurrency(callback, startPoint = 100, minChange = 0, maxChange = 10) {
    if (maxChange < minChange) throw Error("maxChange must be > minChange");

    let point = startPoint;
    callback(point);

    function tick() {
        const random = (Math.random() - 0.5) * 2; //From -1 to 1
        const changeAbsolute = (maxChange - minChange) * Math.abs(random);
        point = point + Math.sign(random) * changeAbsolute;
        if (point < 0) point = -point;
        callback(point);
        setTimeout(tick, getCurrencyDelay())
    }

    setTimeout(tick, getCurrencyDelay());
}