const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '../');

console.log('______________', path.join(rootPath, "dist/dll", "[name]-manifest.json"));

module.exports = {
    mode: 'development',
    entry:  {
        vendor: [
            'react', 'react-dom',
            'react-router',

            'mobx',

            'mobx-react',
        ]
    },

    output: {
        path: path.join(rootPath, 'dist/dll'),
        publicPath: "/assets/",
        filename: '[name].bundle.dll.js',
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
            context: process.cwd(),

            // manifest.json文件的输出位置
            path: path.join(rootPath, "dist/dll", "[name]-manifest.json"),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: "[name]"
        })
    ]
}