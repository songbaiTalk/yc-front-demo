/**
 * @file 生产环境下的webpack配置, 打包后的文件要添加hash值
 * 当文件内容发生变换的时候，hash值会改变，从而前端会重新请求文件
 * @author zhangluyao01
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = require('./paths');

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].[hash].js`,
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
            root: paths.root
        })
    ]
};
