/**
 * @file 开发环境下所用的webpack的配置，开启热更新
 * @author zhangluyao01
 */
const webpack = require('webpack');

const paths = require('./paths');

const proxyServer = 'http://www.51xuezhang.cn';

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: paths.outputPath,
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 450000,
        maxEntrypointSize: 8500000,
        assetFilter: assetFilename => {
            return (
                assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            );
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        // 设置代理，请求会转发到代理上
        proxy: {
            '/xz': {
                target: proxyServer,
                secure: false,
                changeOrigin: true
            },
            '/admin': {
                target: proxyServer,
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map'
};
