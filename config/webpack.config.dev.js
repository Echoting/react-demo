const path = require('path')
const webpack = require('webpack')
// 先定义一些路径
// 配置文件夹路径
const CONFIG_PATH = path.resolve(__dirname)
// 源码文件夹路径
const APP_PATH = path.resolve(CONFIG_PATH, '../src')
// 应用入口文件
const APP_FILE = path.resolve(APP_PATH, 'index.js')
// 打包目录文件夹路径
const BUILD_PATH = path.resolve(CONFIG_PATH, '../dist')


process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    // 入口
    entry: [
        'react-hot-loader/patch',
        // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        'webpack-hot-middleware/client?reload=true',
        APP_FILE
    ],
    // 输出
    output: {
        // 告诉Webpack结果存储在哪里
        path: BUILD_PATH,
        // 打包后的文件名
        filename: 'bundle.js',
        //模板、样式、脚本、图片等资源对应的server上的路径
        publicPath: "/assets/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg|gif)(\?|$)/,
                loader: 'file-loader?name=[hash].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=1200&name=[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        //后缀名自动补全
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        // 根路径别名
        alias: {
            '@': `${APP_PATH}/`,
        },
        modules: [
            'node_modules',
            'src',
        ]
    }
}