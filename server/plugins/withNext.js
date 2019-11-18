/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
    */
const {parse} = require('url');
const next = require('next');
const mobxReact = require('mobx-react');
const dev = process.env.NODE_ENV === 'development';
const ssr = next({dev});
const handle = ssr.getRequestHandler();

mobxReact.useStaticRendering(true);

module.exports = withNext = (server, router) => {
    ssr.prepare().then(() => {
        router.all('*', async (ctx) => {
            let url = ctx.req.url;
            if (!url.includes('/api/')) {
                url = url.replace(server.hkConfig.prefix, '');
            }

            await handle(ctx.req, ctx.res, parse(url, true))
        });
    });
}
