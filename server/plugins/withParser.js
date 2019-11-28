const koaBody = require('koa-body');

module.exports = bodyParser = server => {
    server.use(koaBody({multipart: true}));
};
