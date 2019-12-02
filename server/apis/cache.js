const fetch = require('isomorphic-unfetch');

module.exports = {
    'Get /forceCached': async ctx => {
        try {
            const data = await new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    reject(new Error(500));
                    // resolve([1, 2, 3, 4]);
                }, 5000);
            });
            ctx.restify(data);
        } catch (e) {
            ctx.cautify(e.message);
        }
    },
    'GET /author/:app_id': async ctx => {
        try {
            const res = await fetch(`https://haokan.baidu.com/haokan/wiseauthor?app_id=${ctx.params.url}&_format=json`);
            const {apiData} = await res.json();
            ctx.restify(apiData);
        } catch (e) {
            ctx.cautify({status: 0, message: e.message});
        }
    }
};
