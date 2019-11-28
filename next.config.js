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
                react: {
                    name: 'react',
                    test: module => /react|prop-types/.test(module.context),
                    chunks: 'all',
                    priority: 20,
                    enforce: true
                },
                next: {
                    name: 'next',
                    test: /[\\/]node_modules[\\/](next)[\\/]/,
                    chunks: 'all',
                    priority: 20,
                    enforce: true
                },
                common: {
                    name: 'common',
                    test: module => /@babel|url|scheduler|debug|process|core-js|regenerator-runtime/.test(module.context),
                    chunks: 'all',
                    priority: 20,
                    enforce: true
                },
                styles: {
                    name: 'styles',
                    test: /\.(css|less)$/,
                    chunks: 'async',
                    priority: 20,
                    enforce: true
                }
            };

            return config
        },
        distDir: 'build',
        assetPrefix: dev ? '' : '/haokan-next'
    }
));
