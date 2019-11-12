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
            console.log(arguments);
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

const fibonacii = (n) => {
    if (n === 0 || n === 1) return 1;

    return this.fibonacii(n - 1) + this.fibonacii(n -2);
};

const fibonaciiPlus = (n, ac1 = 1, ac2 = 1) => {
    if (n <= 1) return ac2;

    return this.fibonaciiPlus(n - 1, ac2, ac1 + ac2)
};

const factorial = (n, total) => {
    if (n === 1) return total;

    return this.factorial(n - 1, n * total);
};

const _async = generator => {
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

const _bind = function(context) {
    const self = this;
    const args = Array.prototype.splice.call(arguments, 1);

    return function() {
        const bindArgs = Array.prototype.splice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
};

const _new = function(fn, args) {
    const obj = Object.create(fn.prototype);

    const ret = fn.apply(obj, args);

    return ret instanceof Object ? ret : obj;
};

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

    all() {
        Promise.all(this.tasks);
    }
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

function _Class(name) {
    if (new.target === _Class) {
        this.name = name;
        this.id = ++_Class.id;
    } else {
        return new _Class(name);
    }
}

_Class.id = 0;

Promise.prototype.all = function(promises) {
    let index = 0;
    const resolves = [];

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            (function(i) {
                Promise.resolve(promises[i].then(value => {
                    index++;
                    resolves.push(value);
                    if (index === promises.length) {
                        resolve(resolves);
                    }
                }, reason => {
                    reject(reason);
                }))
            })(i);
        }
    });
}

[1, 2].filter(item => i > 1);

[].__proto__._filter = function(fn) {
    let res = [];

    this.reduce(function(total, value, index, array) {
        const flag = fn.call(this, value);
        if (flag) {
            res.push(value);
        }
    }, null);
}

const quickSort = (arr) => {

    if (arr.length <= 1) { return arr; }

    let pivotIndex = Math.floor(arr.length / 2);

    let pivot = arr.splice(pivotIndex, 1)[0];

    let left = [];

    let right = [];

    for (let i = 0; i < arr.length; i++){

        if (arr[i] < pivot) {

            left.push(arr[i]);

        } else {

            right.push(arr[i]);

        }

    }

    return quickSort(left).concat([pivot], quickSort(right));

};


