const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',    // 一共有四种打包模式，该模式不适合正式生产环境
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: './src',    //服务器加载项目根目录
        historyApiFallback: true,   //不跳转页面
        inline: true,    //实时刷新
        port: 3001,
        hot: true,
        quiet: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: './img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'    //  使页面可以使用 import 引入
                    }, {
                        loader: "css-loader",
                        options: {
                            // modules: true, // 指定启用css modules
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究！'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.temp.html'            //new 一个这个插件的实例，并插入参数
        }),
        new webpack.HotModuleReplacementPlugin(),   //热加载插件
        new FriendlyErrorsWebpackPlugin()
    ]
}