/**
 * @file 定义webpack打包的一些规则
 * @author zhangluyao01
 */
const paths = require('./paths');

module.exports = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath: paths.imgFolder
                }
            }
        ]
    }
];
