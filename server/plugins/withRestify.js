module.exports = withRestify = (server, prefix = '/api/') => {
    server.use(async(ctx, next) => {
        if (ctx.request.path.includes(prefix)) {
            ctx.restify = ctx.cautify = data => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            };

            try {
                await next();
            } catch(e) {
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = e;
            }
        } else {
            await next();
        }
    });
};

