module.exports = {
    'GET /api/suggest': async(ctx) => {
        const options = {
            method: 'POST',
            pack: 'form',
            path: 'http://native.baidu.com/suggest/api/suggest',
            data: ctx.req.query
        };

        let results = null;
        try {
            results = await Promise.all([options]);
            let validResults = results.filter(item => item.status === 0).map(ele => ele.data);

            ctx.rest({validResults});
        } catch (e) {
            ctx.body = e;
        }
    }
};
