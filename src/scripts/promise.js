class _Promise {
    static all(promises) {
        return new _Promise((resolve, reject) => {
            try {
                let count = 0;
                let length = promises.length;
                let values = [];

                for (let promise in promise) {
                    _Promise.resolve(p).then(v => {
                        count++;
                        values.push(v);
                        if (count === length) {
                            resolve(values);
                        }
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    static race(promises) {
        return new _Promise((resolve, reject) => {
            try {
                for (let promise of promises) {
                    _Promise.resolve(promise).then(resolve);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    static resolve(p) {
        if (p instanceof _Promise) {
            return p.then()
        }

        return new _Promise((resolve, reject) => {
            resolve(p);
        })
    }

    static reject(p) {
        if (p instanceof _Promise) {
            return p.catch();
        }

        return new _Promise((resolve, reject) => {
            reject(p);
        });
    }

    constructor(run) {
        this.status = 'pending';
        this.data = 0;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'resolve';
                this.data = value;
                this.resolveCallbacks.forEach(callabck => callback(value));
            }
        };

        const reject = value => {
            if (this.status === 'pending') {
                this.status = 'reject';
                this.data = value;
                this.rejectCallbacks.forEach(callback => callback(value));
            }
        }

        try {
            run(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : value => value;
        onReject = typeof onReject === 'function' ? onReject : error => error;

        switch (this.status) {
            case 'pending': return new _Promise((resolve, reject) => {
                this.resolveCallbacks.push(value => {
                    try {
                        const result = onResolve(value);
                        if (result instanceof _Promise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
                this.rejectCallbacks.push(error => {
                    try {
                        const result = onReject(error);
                        if (result instanceof _Promise) {
                            result.then(resolve, reject);
                        } else {
                            reject(error);
                        }
                    } catch (e) {
                        reject(error);
                    }
                });
            });
            case 'fullfilled': return new _Promise((resolve, reject) => {
                try {
                    const result = onResolve(this.data);
                    if (result instanceof _Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            });
            case 'reject': return new _Promise((resolve, reject) => {
                try {
                    const result = onReject(this.data);
                    if (result instanceof _Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }
    }
}
