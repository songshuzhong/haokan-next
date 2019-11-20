const fs = require('fs');
const path = require('path');

/**
 *
 * @param router
 * @param mappers
 */
const generatorMapping = (router, mappers) => {
    for (let mapper in mappers) {
        let key;

        try {
            key = mapper.split(' ');
        } catch (e) {
            console.error('the url should be like this: "get /api/"!');
        }

        switch (key[0].toLowerCase()) {
            case 'get':
                router.get(key[1], mappers[mapper]);
                break;
            case 'put':
                router.put(key[1], mappers[mapper]);
                break;
            case 'post':
                router.post(key[1], mappers[mapper]);
                break;
            case 'delete':
                router.del(key[1], mappers[mapper]);
                break;
            default:
                console.log('invalid url: ' + mapper);
        }
    }
};

/**
 *
 * @param router
 * @param dir
 */
const generatorApi = (router, dir) => {
    fs.readdirSync(dir)
        .filter((f) => f.endsWith('.js'))
        .forEach((f) => generatorMapping(router, require(dir + '/' + f)));
};

module.exports = withApiObserver = (server, router, dir = '../routers') => {
    router.prefix(server.hkConfig.prefix);

    generatorApi(router, path.resolve(path.join(__dirname, dir)));

    server.use(router.routes());
};
