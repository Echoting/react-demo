const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const DLL_PATH = path.resolve(ROOT_PATH, '../dist/dll-dev');

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // 入口
    entry: [
        'react-hot-loader/patch',
        // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
        'webpack-hot-middleware/client?reload=true',
        // @todo 待修改
        path.resolve(ROOT_PATH, '../src/module/MainModule/index.js')
    ],
    // 输出
    output: {
        // 告诉Webpack结果存储在哪里
        path: path.resolve(ROOT_PATH, '../dist/assets'),
        // 打包后的文件名
        filename: '[name].bundle.js',
        //模板、样式、脚本、图片等资源对应的server上的路径
        publicPath: "",
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'), //定义编译环境
                BABEL_ENV: JSON.stringify('development'), //定义编译环境
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

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
            filepath: require.resolve('../dist/dll-dev/vendor.bundle.dll.js'), // 这个路径是你的dll文件路径
            // includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
        })
    ]
});