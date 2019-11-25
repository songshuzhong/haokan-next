const path = require('path');
const withLess = require('@zeit/next-less');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const LessFunc = require('less-plugin-functions');
const config = require('./config/config');
const dev = process.env.NODE_ENV !== 'production';

if (typeof require !== 'undefined') {
    require.extensions['.css'] = () => {};
    require.extensions['.less'] = () => {};
}

module.exports = withBundleAnalyzer(withLess(
    {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
            server: {
                analyzerMode: 'static',
                reportFilename: './server.html',
            },
            browser: {
                analyzerMode: 'static',
                reportFilename: './client.html',
            },
        },
        webpack(config, {buildld, dev, isServer, defaultLoaders}) {
            config.entry.vendors = ['react', 'react-dom', 'react-loadable', 'react-router', 'react-router-dom'];
            config.optimization.splitChunks = {
                cacheGroups: {
                    vendors: {
                        name: 'commons',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    },
                    runtimeChunk: {
                        name: "runtime"
                    }
                }
            };
            config.resolve.alias.components = path.join(__dirname, './src/components');
            config.resolve.alias.components = path.join(__dirname, './src/styles');
            config.resolve.alias.components = path.join(__dirname, './src/stores');
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
            localIdentName: '[local]___[hash:base64:5]',
            plugins: [new LessFunc()]
        },
        distDir: 'build',
        assetPrefix: dev ? '/' : config.prefix
    }
));
