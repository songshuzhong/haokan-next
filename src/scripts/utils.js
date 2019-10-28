const debounce = (fn, time) => {
    let timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, time);
    }
};

const throttle = (fn, time) => {
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

const deepFirstSearch = (node, list = []) => {
    if (node) {
        list.push(node);
        const children = node.children;

        for (let i = 0; i < children.length; i++) {
            this.deepFirstSearch(children[i], list);
        }
    }

    return list;
};

const widthFirstSearch = (node) => {
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

const _async = generator => {
    const iterator = generator();

    const handle = generatorResult => {
        if (generatorResult.done) return;

        const generatorValue = generatorResult.value;

        if (generatorValue instanceof Promise) {
            generatorValue
                .then(result => handle(iterator.next(result)))
                .catch(iterator.throw(e));
        }
    };

    try {
        handle(iterator.next());
    } catch(e) {
        console.log(e);
    };
};

const _bind = function(context) {
    const self = this;
    const args = Array.prototype.splice.call(arguments, 1);

    return function() {
        const bindArgs = Array.prototype.splice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}

class _Promise {
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

class Queue {
    constructor() {
        this.queue = [];
        this.tasks = [];
        this.maxSize = 0;
        this.activeCount = 0;
    }

    push(fn) {
        this.tasks.push(new Promise((resolve, reject) => {
            const task = () => {
                this.activeCount++;
                fn
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

