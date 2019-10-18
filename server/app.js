const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const mobxReact = require('mobx-react');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
let port = dev ? 4324 : 7005;

const proxyOptions = {
    '/haokan': {
        target: 'http://test.rmb.rmb.otp.baidu.com',
        changeOrigin: true,
        logs: true
    }
};

mobxReact.useStaticRendering(true);

app.prepare()
    .then(() => {
        const server = new Koa();
        const router = new Router();

        if (dev && proxyOptions) {
            const proxy = require('koa-proxies');

            Object.keys(proxyOptions).forEach(function (context) {
                server.use(proxy(context, proxyOptions[context]))
            });
        }

        router.get('*', async (ctx) => {
            await handle(ctx.req, ctx.res)
        });

        server.use(async (ctx, over) => {
            ctx.res.statusCode = 200;
            await over();
        });

        server.use(router.routes());

        server.listen(port, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost ' + port)
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
