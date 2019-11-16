class _Promise {
    static all(promises) {
        return new _Promise((resolve, reject) => {
            let count = 0;
            let length = promises.length;
            let values = [];
            for (let promise of promises) {
                _Promise.resolve(promise).then(value => {
                    count++;
                    values.push(value);
                    if (length === count) {
                        resolve(values);
                    }
                });
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
                console.log(e);
            }
        });
    }

    static resolve(p) {
        if (p instanceof _Promise) {
            return p.then();
        }

        return new _Promise((resolve, reject) => {
            resolve(p);
        });
    }

    static reject(p) {
        if (p instanceof _Promise) {
            return p.catch();
        }

        return new _Promise((resolve, reject) => {
          reject(p);
        })
    }

    constructor(run) {
        this.status = 'pending';
        this.data = 0;
        this.resolveCallback = [];
        this.rejectCallback = [];

        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'resolve';
                this.data = value;
                this.resolveCallback.forEach(callback => callback(value));
            }
        };
        const reject = error => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.data = error;
                this.rejectCallback.forEach(callback => callback(error));
            }
        }

        try {
            run(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }

    then(onResolve, onReject) {
        onResolve = typeof onResolve === 'function' ? onResolve : value => value;
        onReject = typeof onReject === 'function' ? onReject : error => error;

        switch (this.status) {
            case 'pending': return new _Promise((resolve, reject) => {
                this.resolveCallback.push(value => {
                    try {
                        const result = onResolve(value);
                        if (result instanceof _Promise) {
                            result.then(resolve, reject);
                        } else {
                           resolve(result);
                      }
                    } catch(e) {
                        reject(e);
                    }
                });
                this.rejectCallback.push(error => {
                      try {
                          const value = onResolve(error);
                          if (value instanceof _Promise) {
                              value.then(resolve, reject);
                          } else {
                              reject(error);
                          }
                      } catch(e) {
                          reject(e);
                      }
                });
            });
            case 'fullfilled': return new _Promise((resolve, reject) => {
                try {
                    const value = onResolve(this.data);
                    if (value instanceof _Promise) {
                        value.then(resolve, reject);
                    } else {
                        resolve(value);
                    }
                } catch (e) {
                    reject(e);
                }
            });
          case 'reject': return new _Promise((resolve, reject) => {
              try {
                  const value = onReject(this.data);
                  if (value instanceof _Promise) {
                      value.then(resolve, reject);
                  } else {
                      resolve(value);
                  }
              } catch (e) {
                  reject(e);
              }
          })
        }
    }
}