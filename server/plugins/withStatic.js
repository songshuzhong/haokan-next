const path = require('path');
const staticCache = require('koa-static-cache');

module.exports = withStatic = (server) => {
    server.use(staticCache(path.join(__dirname, '../../static'), {proxy: '/haokan-next'}));
};
