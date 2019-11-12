const throttle = (fn, time) => {
    let canRun = true;
    let timer = null;
    return function() {
        if (!canRun) return;
        canRun = false;
        timer = setTimeout(() => {
            canRun = true;
            fn.apply(this, arguments);
        }, time);
    }
};
