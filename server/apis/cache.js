module.exports = {
    'Get /api/forceCached': async ctx => {
        const data = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3, 4]);
            }, 5000);
        });
        ctx.rest(data);
    }
};
