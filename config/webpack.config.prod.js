const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist/assets'); // 发布文件所存放的目录

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: [
        path.resolve(ROOT_PATH, '../src/index.js')
    ],
    output: {
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        // “path”仅仅告诉Webpack结果存储在哪里
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        chunkFilename: "[name].[hash].js",
        //模板、样式、脚本、图片等资源对应的server上的路径
        // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
        publicPath: "",
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'), //定义编译环境
                BABEL_ENV: JSON.stringify('production'), //定义编译环境
            }
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(ROOT_PATH, '../server/index.html'),
        //     filename: '../../dist/index.html',
        //     inject: 'body',
        //     minify: {
        //         html5: true
        //     },
        //     hash: false
        // }),
        // new CleanWebpackPlugin(['../dist'])
    ],

    // optimization: {
    //     // @todo 优化包
    //     runtimeChunk: {
    //         name: "manifest"
    //     },
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 priority: -20,
    //                 chunks: "all"
    //             }
    //         }
    //     },
    //     minimizer: [
    //         new OptimizeCSSAssetsPlugin({})
    //     ]
    // }
});