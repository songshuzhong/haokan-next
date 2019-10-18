const withLess = require('@zeit/next-less');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dev = process.env.NODE_ENV !== 'production';

if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {};
}
module.exports = withLess(
    {
        webpack(config, {buildld, dev, isServer, defaultLoaders}) {
            config.optimization = {
                minimize: !dev,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            parse: {
                                ecma: 8
                            },
                            compress: {
                                ecma: 5,
                                warnings: false,
                                comparisons: false,
                                inline: 2
                            },
                            mangle: {
                                safari10: true
                            },
                            output: {
                                ecma: 5,
                                comments: false,
                                ascii_only: true  // eslint-disable-line
                            }
                        },
                        parallel: true,
                        cache: true,
                        sourceMap: false
                    }),
                    new OptimizeCSSAssetsPlugin({
                        cssProcessorOptions: {
                            parser: safePostCssParser,
                            discardComments: {
                                removeAll: true
                            }
                        }
                    })
                ]
            };
            return config;
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
        },
        distDir: 'build',
        assetPrefix: dev ? '/' : '/haokan-next'
    }
);
