# urlMaker 开发流程

## 项目需求
* 对 url 链接中的汉字和参数进行替换
1.
机蜜首页：https://h5.jimistore.com/#/tab/lease
输入参数：channelName（渠道名）
输出：https://h5.jimistore.com/?channelName=${channelName}#/tab/lease

2.
商品专区：
输入参数：专区ID，专区名称，渠道名
输出：https://h5.jimistore.com/?channelName=${channelName}#/tab/typeList/${专区id}/${专区名称}

3.
商品详情：
输入参数：商品ID，渠道名
输出：https://h5.jimistore.com/?channelName=${channelName}#/tab/leaseChoose/${商品ID}/

4.
活动：
输入参数：活动链接，渠道名
输出：${活动链接}?channelName=${channelName}

## 技术栈

* 框架：react
> 注意：路由用的是4.0版

* 打包工具：webpack2.0
* 代码：es6
* 规范：ESlint

## 前期准备
* 由于之前的项目中都用的是 gulp 打包，所以 webpack 是个大坑，由于没有怎么深入了解，所以对其中的一些配置有点茫然，想起之前用过 vue-cli，里面有 webpack 的配置，然后，就没有然后了......
* 百度是个好东西，寻找了一系列文章，个人认为简书上的《入门webpack，看这篇就够了》足矣满足大多数需求，很感谢作者的良苦用心。点赞！

## 环境配置

### webpack 核心模块
#### entry
项目唯一入口
>这里发现一个问题，就是当我打包时全部 js 在同一个文件中，文件太大了，性能体验上是非常可怕的，反正我觉得如果2g网浏览是GG了的。处理的方式是: 给入口添加一个 vendor，将依赖库写入这个 vendor 中,如果觉得依赖包太大可以写成 vendor1，vendor2.

#### output
项目输出文件夹 
> [name].[hash:8].js

#### module
html,js,css,img 处理组件
* css-loader
* babel-loader
* url-loader
* style-loader
* postcss-loader

#### plugins
其他优化插件,该处只介绍 webpack 自带的一些插件库
* webpack.BannerPlugin
> 给打包文件添加一个banner

* webpack.optimize.UglifyJsPlugin
> 压缩 js

* webpack.optimize.OccurrenceOrderPlugin
> 添加唯一 ID

### webpack 推荐模块
* webpack-dev-server
热加载插件，在 script 中的命令参数：
> --devtool eval:为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
> --progress: 显示合并代码进度
> --colors: 在命令行中显示颜色
> --content-base build: 指向设置的输出目录
> --hot: 注意在 config 文件中如果已经new plugin，就不要hot了，二选一。

* html-webpack-plugin 
根据预先的模板实例化一个html
```
new HtmlWebpackPlugin({
        title: '',
        template: __dirname + "/src/index.html",
        minify: {
            "removeAttributeQuotes": true,      //  移除注释
            "removeComments": true,             //  移除空格
            "removeEmptyAttributes": true,      //  移除空白行
        },
        chunks: ['index', 'vendors'],   // 配置该html文件要添加的模块
        // inject: 'body'
    })
```

* clean-webpack-plugin
删除 webpack 缓存插件
```
new CleanWebpackPlugin('build/', {          //  清除缓存文件
        root: __dirname,
        verbose: true,
        dry: false
    })
```

* extract-text-webpack-plugin
将 css 抽离出 js
```
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
```

* friendly-errors-webpack-plugin
友好的错误提示插件

### package.json 配置

#### 依赖包
1. autoprefixer(需要和 postcss-loader 一起使用)
> 补全 css 前缀

2. babel 合集
```
babel-core
babel-loader
babel-plugin-react-transform
babel-preset-env
babel-preset-react
```

3. react-transform-catch-errors、redbox-react
> react 报错插件

4. copy-to-clipboard
> 点击复制到剪贴板插件