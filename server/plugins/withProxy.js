/**
 *@file
 *@Date 2019/07/01
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@desc
 *@link
*/
const proxyOptions = {
    '/haokan': {
        target: 'http://test.rmb.rmb.otp.baidu.com',
        changeOrigin: true,
        logs: true
    }
};

module.exports = withProxy = (server) => {
    const proxy = require('koa-proxies');

    Object.keys(proxyOptions).forEach(function (context) {
        server.use(proxy(context, proxyOptions[context]))
    });
}
