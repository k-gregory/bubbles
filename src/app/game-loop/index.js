const initialState = {
    currentTime: performance.now()
};

const loopTickType = "ACTION_LOOP_TICK";

function loopTick(diff) {
    return {
        currentTime: performance.now(),
        diff,
        type: loopTickType
    }
}

export function startGameLoop(store) {
    let prevTime = performance.now();
    const f = () => {
        const newTime = performance.now();
        const oldTime = prevTime;
        prevTime = newTime;
        store.dispatch(loopTick(newTime - oldTime));
        requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
}

export function gameLoopReducer(state = initialState, action) {
    switch (action.type) {
        case loopTickType:
            return {
                currentTime: action.currentTime
            };
        default:
            return state;
    }
}

