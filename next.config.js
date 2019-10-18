const withLess = require('@zeit/next-less');
const dev = process.env.NODE_ENV !== 'production';
if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {};
}
module.exports = withLess(
    {
        webpack(config, {buildld, dev, isServer, defaultLoaders}) {
            config.module.rules.push(
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack']
                });
            return config;
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
        },
        cssModules: false,
        distDir: 'build',
        // assetPrefix: dev ? '/' : '/haokan-next'
    }
);
