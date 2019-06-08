/**
 * @file 公共的webpack配置，无论是开发环境还是生产环境均依赖于此部分配置
 * @author zhangluyao01
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
    entry: paths.entryPath,
    module: {
        rules
    },
    resolve: {
        // 规定webpack去那里解析模块
        modules: ['src', 'node_modules'],
        // 解析哪些类型的文件
        extensions: ['.js', '.jsx']
    },
    // 插件系统
    plugins: [
        // 这个不知道干什么用的
        new webpack.ProgressPlugin(),
        // 将打包好的js文件自动插入到模板文件并生成一个新的html文件
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            // 压缩文件
            colllapseInlineTagWhitespace: true,
            collapseWhiteSpace: true,
            preserveLinebreaks: true,
            removeComments: true,
            removeAttributeQuotes: true
        })
    ]
};
