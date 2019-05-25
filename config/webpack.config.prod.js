const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist/assets'); // 发布文件所存放的目录
const PAGE_PATH = path.resolve(BUILD_PATH, './pages'); // 发布文件所存放的目录
const DLL_PATH = path.resolve(ROOT_PATH, '../dist/dll-prod');


const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const {entries, entriesConfig} = require('./getEntry')();

const htmlPlugins = entriesConfig.map(item => {
    return new HtmlWebpackPlugin({
        template: path.resolve(ROOT_PATH, '../server/index.html'),
        filename: path.resolve(PAGE_PATH, `${item.entryName}.html`),
        chunks: [`${item.entryName}`]
    })
})

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: entries,
    devtool: 'source-map',
    output: {
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        // “path”仅仅告诉Webpack结果存储在哪里
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        chunkFilename: "[name].[hash].js",
        //模板、样式、脚本、图片等资源对应的server上的路径
        // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
        publicPath: "dist/assets/",
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'), //定义编译环境
                BABEL_ENV: JSON.stringify('production'), //定义编译环境
            }
        }),

        new webpack.DllReferencePlugin({
            // 跟dll.config里面DllPlugin的context一致
            context: process.cwd(),

            // dll过程生成的manifest文件
            manifest: require(path.join(DLL_PATH, "vendor-manifest.json"))
        }),

        ...htmlPlugins,

        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, '../server/index.html'),
            filename: '../../index.html',
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('../dist/dll-prod/vendor.bundle.dll.js'), // 这个路径是你的dll文件路径
            // includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
        })

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