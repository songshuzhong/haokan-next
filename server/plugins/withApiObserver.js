const fs = require('fs');
const path = require('path');

/**
 *
 * @param router
 * @param mappers
 */
const generatorMapping = (apiPrefix, router, mappers) => {
    for (let mapper in mappers) {
        let key;

        try {
            key = mapper.split(' ');
        } catch (e) {
            console.error('the url should be like this: "get /api/"!');
        }

        switch (key[0].toLowerCase()) {
            case 'get':
                router.get(apiPrefix + key[1], mappers[mapper]);
                break;
            case 'put':
                router.put(apiPrefix + key[1], mappers[mapper]);
                break;
            case 'post':
                router.post(apiPrefix + key[1], mappers[mapper]);
                break;
            case 'delete':
                router.del(apiPrefix + key[1], mappers[mapper]);
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
const generatorApi = (apiPrefix, router, dir) => {
    fs.readdirSync(dir)
        .filter((f) => f.endsWith('.js'))
        .forEach((f) => generatorMapping(apiPrefix, router, require(dir + '/' + f)));
};

module.exports = withApiObserver = (server, router, dir = '../apis') => {
    const {basename, version} = server.setting;
    router.prefix(basename);

    generatorApi(version + '/api', router, path.resolve(path.join(__dirname, dir)));

    server.use(router.routes());
};
