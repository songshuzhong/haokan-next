module.exports = {
    'GET /api/suggest': async() => {
        const options = {
            method: 'POST',
            pack: 'form',
            path: 'http://native.baidu.com/suggest/api/suggest',
            data: ctx.req.query
        };
        console.log(4567);
        let results = null;
        try {
            results = await Promise.all([options]);
            let validResults = results.filter(item => item.status === 0).map(ele => ele.data);

            console.log(1111, validResults);
            ctx.rest({results});
        } catch (e) {
            ctx.body = e;
        }
    }
};
