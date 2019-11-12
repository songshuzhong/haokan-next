class FetchLess {
    constructor(maxSize) {
        this.tasks = [];
        this.queue = [];
        this.maxSize = maxSize;
        this.activeCount = 0;
    }

    add(fn) {
        this.tasks.push(new Promise((resolve, reject) => {
            const task = () => {
                this.activeCount++;
                fn()
                    .then(data => resolve(data))
                    .then(() => this.next())
                    .catch(error => reject(error));
            };
            if (this.activeCount < this.maxSize) {
                task();
            } else {
                this.queue.push(task);
            }
        }));
    }

    next() {
        if (this.activeCount > 1) {
            this.activeCount--;
            this.queue.shift()();
        }
    }

    all = () => Promise.all(this.tasks);
}
