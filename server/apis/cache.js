module.exports = {
    'Get /api/forceCached': async ctx => {
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
    }
};
