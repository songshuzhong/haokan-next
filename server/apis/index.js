const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const launchLighthouse = (url, opts, config = null) => {
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr)
        });
    });
};

module.exports = {
    'GET /api/suggest/:url': async(ctx) => {
        const options = {
            chromeFlags: ['--headless']
        };
        try {
            const results = await launchLighthouse(ctx.params.url, options) || {};
            ctx.restify({results});

        } catch (e) {
            ctx.cautify(e.message);
        }
    }
};
