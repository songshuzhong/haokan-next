const cache = require('memory-cache');

module.exports = withCache = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.req.url.includes('/api')) {
            let key = '_koa_' + ctx.req.url;
            let cacheBody = cache.get(key);

            if (cacheBody) {
                ctx.body = cacheBody;
            } else {
                await next();
                cache.put(key, ctx.body, 5 * 1000);
            }
        } else {
            await next();
        }
    });
};
