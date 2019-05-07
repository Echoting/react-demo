const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const DLL_PATH = path.resolve(ROOT_PATH, '../dist/dll');
const APP_PATH = path.resolve(ROOT_PATH, '../src');

const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
        new webpack.DllReferencePlugin({
            // 跟dll.config里面DllPlugin的context一致
            context: process.cwd(),

            // dll过程生成的manifest文件
            manifest: require(path.join(DLL_PATH, "vendor-manifest.json"))
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, '../server/index.html'),
            filename: 'index.html',
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('../dist/dll/vendor.bundle.dll.js'), // 这个路径是你的dll文件路径
            // includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
        })
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