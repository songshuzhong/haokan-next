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

module.exports = withNext = (app, router) => {
    ssr.prepare().then(() => {
        router.get('*', async (ctx) => {
            let url = ctx.req.url;
            url = url.replace(app.hkConfig.prefix, '');
            await handle(ctx.req, ctx.res, parse(url, true))
        });
    });
}
