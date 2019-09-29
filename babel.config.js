module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            'next/babel'
        ],
        plugins: [
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties', {loose: true}],
            ['styled-components', {ssr: true, displayName: true, preprocess: false}]
        ]
    };
}
