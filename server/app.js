/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
const Koa = require('koa');
const Router = require('koa-router');
const withNext = require('./withNext');
const withProxy = require('./withProxy');
const withConfig = require('./withConfig');
const withRestity = require('./withRestify');
const withApiObserver = require('./withApiObserver');
const dev = process.env.NODE_ENV !== 'production';

const server = new Koa();
const router = new Router({prefix: '/haokan-next'});

if (dev) {
    // 配置接口代理
    withProxy(server);
}
// 配置koa全局参数
withConfig(server);

server.use(withRestity());

withNext(server, router, withApiObserver);

const port = server.hkConfig.serverPort || 8080;

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready at http://localhost:${port}`);
});
