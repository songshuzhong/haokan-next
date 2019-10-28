export const debounce = (fn, time) => {
    let timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, time);
    }
};

export const throttle = (fn, time) => {
    let canrun = true;

    return function() {
        if (!canrun) return;
        canrun = false;

        setTimeout(() => {
            fn.apply(this, arguments);
            canrun = true;
        }, time);
    }
};

export const deepFirstSearch = (node, list = []) => {
    if (node) {
        list.push(node);
        const children = node.children;

        for (let i = 0; i < children.length; i++) {
            this.deepFirstSearch(children[i], list);
        }
    }

    return list;
};

export const widthFirstSearch = (node) => {
    const stack = [];
    const list = [];

    if (node) {
        stack.push(node);
        while (stack.length) {
            const item = stack.shift();
            const children = item.children;

            list.push(item);

            for (let i = 0; i < children.length; i++) {
                stack.push(children[i]);
            }
        }
    }

    return list;
};

export const fibonacii = (n) => {
    if (n === 0 || n === 1) return 1;

    return this.fibonacii(n - 1) + this.fibonacii(n -2);
};

export const fibonaciiPlus = (n, ac1 = 1, ac2 = 1) => {
    if (n <= 1) return ac2;

    return this.fibonaciiPlus(n - 1, ac2, ac1 + ac2)
};

export const factorial = (n, total) => {
    if (n === 1) return total;

    return this.factorial(n - 1, n * total);
};

export const _async = generator => {
    const iterator = generator();

    const handle = generatorResult => {
        if (generatorResult.done) return;

        const generatorValue = generatorResult.value;

        if (generatorValue instanceof Promise) {
            generatorValue
                .then(result => handle(iterator.next(result)))
                .catch(e => iterator.throw(e));
        }
    };

    try {
        handle(iterator.next());
    } catch(e) {
        console.log(e);
    };
};

export const _bind = function(context) {
    const self = this;
    const args = Array.prototype.splice.call(arguments, 1);

    return function() {
        const bindArgs = Array.prototype.splice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}

export class _Promise {
    constructor(run) {
        this.resolveList = [];
        this.status = 'pending';
        this.data = 0;

        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.data = value;

                this.resolveList.forEach(callback => callback(value));
            }
        };

        run(resolve);
    }

    then(onResovle) {
        onResovle = typeof onResovle === 'function' ? onResovle : value => value;

        switch (this.status) {
            case 'pending': return _Promise(resolve => {
                this.resolveList.push(value => {
                    const result = onResovle(value);

                    resolve instanceof _Promise ? result.then(resolve) : resolve(result);
                });
            });
            case 'fulfilled': return _Promise(resolve => {
                const result = onResovle(value);

                resolve instanceof _Promise ? result.then(resolve) : resolve(result);
            });
        }
    }
}

export class Queue {
    constructor(maxSize) {
        this.queue = [];
        this.tasks = [];
        this.maxSize = maxSize;
        this.activeCount = 0;
    }

    push(fn) {
        this.tasks.push(new Promise((resolve, reject) => {
            const task = () => {
                this.activeCount++;
                fn()
                    .then(data => resolve(data))
                    .then(() => this.next())
                    .catch(err => reject(err));
            };

            if (this.activeCount < this.maxSize) {
                task();
            } else {
                this.queue.push(task);
            }
        }));
    }

    next() {
        this.activeCount--;
        if (this.queue.length > 0) {
            this.queue.shift()();
        }
    }

    all = () => Promise.all(this.tasks);
}

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
