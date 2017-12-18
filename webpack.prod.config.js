// webpack.production.config.js
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');    // 将 css 抽离
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        vendor1: [
            'react',
            'react-dom'
        ],
        vendor2: [
            'react-router-dom'
        ],
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/',
        filename: "js/[name].[hash:8].js", 
        chunkFilename: 'js/[id].[hash:8].js'
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: './img/[name].[hash:7].[ext]'
                }
            }, {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",               // 提取 css 文件
                    use: [{                                 // 编译文件
                            loader: "css-loader",
                            options: {
                                // modules: true,              // 组件化
                                minimize: true              // 压缩
                            }
                        }, {
                            loader: "postcss-loader"     // 将 css 添加前缀
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist/', {          //  清除缓存文件
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.BannerPlugin('版权所有，翻版必究 -- 机蜜'),
        new webpack.optimize.CommonsChunkPlugin({             // 提取公共 js 模块
            names: [
                'vendor2',
                'vendor1',
                'manifest'
            ]
        }),
        new HtmlWebpackPlugin({
            // title: '',
            template: __dirname + "/src/index.temp.html",
            minify: {
                "removeAttributeQuotes": true,      //  移除注释
                "removeComments": true,             //  移除空格
                "removeEmptyAttributes": true,      //  移除空白行
            },
            // chunks: ['index', 'vendors'],   // 配置该html文件要添加的模块
            // inject: 'body'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),  //  添加 ID
        new webpack.optimize.UglifyJsPlugin(),         //  压缩 js
        new ExtractTextPlugin('css/[name].[hash:8].css', {
            allChunks: false
        })                                              //  抽离 css
    ]
};