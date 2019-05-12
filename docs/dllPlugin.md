## webpack 提上编译速度值DLLPlugin
- DllPlugin结合DllRefrencePlugin插件的运用，对将要产出的bundle文件进行拆解打包，可以很彻底地加快webpack的打包速度，从而在开发过程中极大地缩减构建时间。

### 使用方法：
1）创建一个dll配置文件 webpack.dll.config.js

```
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
        filename: '[name].bundle.dll.js', // 动态链接库输出的文件名称
        library: "[name]" // // 全局变量名称 导出库将被赋给这个全局变量 通过这个变量获取到里面模块
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
```
- output.libraryTarget 规定了以哪一种导出你的库  默认以全局变量形式 浏览器支持的形式
![](http://pik.internal.baidu.com/2019/05/07/7b39f7955b39ab3147fe18be70049b2c.png)

- dll 目录下会多出两个文件，vendor.bundle.dll.js 和 vendor-manifest.json
vendor.bundle.dll.js 动态链接库 里面包含了 react和react-dom等等的内容  
vendor-manifest.json 描述链接库(vendor.bundle.dll)中的信息

2）在配置文件中 webpack.config.base.js中使用动态链接库文件
```
new webpack.DllReferencePlugin({
    // 跟dll.config里面DllPlugin的context一致
    context: process.cwd(),

    // dll过程生成的manifest文件
    manifest: require(path.join(DLL_PATH, "vendor-manifest.json"))
}),
```

3）将动态链接库文件加载到页面中
- 借助html-webpack-plugin 和 add-asset-html-webpack-plugin
```
new HtmlWebpackPlugin({
    template: path.resolve(ROOT_PATH, '../server/index.html'),
    filename: 'index.html',
}),
new AddAssetHtmlPlugin({
    filepath: require.resolve('../dist/dll/vendor.bundle.dll.js'), // 这个路径是你的dll文件路径
    // includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
})
```

4） 遇到的问题，开发环境下报错
![](http://pik.internal.baidu.com/2019/05/07/e138112c6f87f583044ec9ace5a23cdc.png)
原因是没能将vendor.bundle.dll.js正确的引入到页面中（路径错误）

区分环境

