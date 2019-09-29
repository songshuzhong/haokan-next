const path = require('path');
const withLess = require('@zeit/next-less');
module.exports = withLess(
    {
        webpack(config, {buildld, dev, isServer, defaultLoaders}) {
            config.module.rules.push(
                {
                    test: /\.(tsx|ts|js|mjs|jsx)$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'node_modules/@baidu/haokan-util'),
                        path.resolve(__dirname, 'node_modules/@baidu/haokan-ui')
                    ]
                },{
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });
            return config;
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
            importLoaders: 1,
            localIdentName: "[local]___[hash:base64:5]"
        },
        distDir: 'build'
    }
);
