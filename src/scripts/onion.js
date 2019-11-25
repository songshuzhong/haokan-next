class Koa {
    constructor() {
        this.index = 0;
        this.tasks = [];
    }

    use = fn => {
        this.tasks.push(fn);
    }

    compose1 = () => {
        if (this.index === this.tasks.length) {
            return;
        }

        const task = this.tasks[this.index];
        this.index++;
        task(() => this.compose1());

    }

    compose2 = () => {
        return (async function() {
            let next = async () => Promise.resolve();

            function createNext(middleware, oldNext) {
                return async () => {
                    await middleware(oldNext);
                };
            }

            for (let i = this.tasks.length - 1; i >= 0; i--) {
                next = createNext(this.tasks[i], next);
            }

            await next();
        })();
    }
}

const app = new Koa();
app.use(async next => {
    console.log(1);
     await next();
    console.log(2);
});
app.use(async next => {
    console.log(3);
    await  next();
    console.log(4);
});
app.use(async next => {
    console.log(5);
    await next();
    console.log(6);
});
app.compose2();
