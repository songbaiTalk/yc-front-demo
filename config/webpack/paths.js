/**
 * @file 定义了项目中用到的一些路径
 * @author zhangluyao01
 */
const path = require('path');

module.exports = {
    // 项目的根目录，当前目录的上级目录的上级目录
    root: path.resolve(__dirname, '../', '../'),
    // 打包后的目录
    outputPath: path.resolve(__dirname, '../', '../', 'build'),
    // 所有文件的入口
    entryPath: path.resolve(__dirname, '../', '../', 'src/index.jsx'),
    // html模板文件的入口
    templatePath: path.resolve(__dirname, '../', '../', 'src/index.html'),
    jsFolder: 'js',
    imgFolder: 'images'
};
