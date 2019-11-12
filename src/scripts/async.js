const _async = generate => {
    const iterator = generate();
    const handle = generateResult => {
        if (generateResult.done) return;

        const generateValue = iterator.value;

        if (generateValue instanceof Promise) {
            generateValue
                .then(value => handle(iterator.next(value)))
                .catch(error => iterator.throw(error));
        }
    };

    try {
        handle(iterator.next());
    } catch (e) {
        console.log(e);
    }
};

_async(function *() {
    try {
        const a = yield Promise.resolve(1);
        const b = yield Promise.resolve(a + 10);
        const c = yield setTimeout(() => b + 2, 2000);

        console(a, b, c);
    } catch (e) {
        console.log(e);
    }
});
