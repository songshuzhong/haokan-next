const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const dev = process.env.NODE_ENV !== 'production';

module.exports = withBundleAnalyzer(withLess(
    {
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
            browser: {
                analyzerMode: 'static',
                reportFilename: './client.html',
            },
        },
        webpack: (config) => {
            config.optimization.splitChunks.cacheGroups = {
                mobx: {
                    name: 'mobx',
                    test: module => /mobx/.test(module.context),
                    chunks: 'initial',
                    priority: 10
                },
                nextjs: {
                    name: 'nextjs',
                    test: module => /nextjs/.test(module.context),
                    chunks: 'initial',
                    priority: 10
                },
                common: {
                    name: 'common',
                    chunks: 'initial',
                    priority: 10,
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.(css|less)$/,
                    chunks: 'async',
                    enforce: true
                }
            };

            return config
        },
        distDir: 'build',
        assetPrefix: dev ? '/' : '/haokan-next'
    }
));
