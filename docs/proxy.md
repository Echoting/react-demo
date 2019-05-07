## webpack 设置服务器代理
#### 解决跨域  
- 原理： 利用服务器访问服务器没有跨域问题的原理

- 请求过程：先向代理(同源)服务器发起请求，再由代理(同源)服务器请求外部服务器

#### 代理服务器的搭建
1） 安装 http-proxy-middleware 包  
2） http-proxy-middleware 的配置
```
proxy('/api', {target: 'http://10.16.85.138:8080'})

当发起的请求包含`/api`时，请求就会经过代理服务器，例如：

项目发起的请求地址是：`http://localhost:8000/api`

经过代理服务器就变成了：`http://10.16.85.138:8080/api`

```
3）一个配置的栗子
```
// 引用依赖
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');

// proxy 中间件的选择项
var proxyTable = {
'/api': {
       // 目标服务器 host
       target: 'http://10.16.85.138:8080', 
       // 默认false，是否需要改变原始主机头为目标URL
       changeOrigin: true, 
       pathRewrite: {
         // 重写请求，比如我们源访问的包含/api，那么请求会将/api替换为/yh/ihr/api
        '/api': '/yh/ihr/api', 
         // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
        '^/api/old-path' : '/api/new-path',  
        // 同上
        '^/api/remove/path' : '/path'
       },
       router: {
           // 如果请求接口 == '/api/'
           // 则重写目标服务器 'http://10.16.85.138:8080' 为 'http://localhost:8000'
           '/api/' : 'http://localhost:8000'
       },
    // proxy事件: 监听请求返回事件
    onProxyRes : proxy.on('proxyRes', function (proxyRes, req, res) {
      console.log('target', JSON.stringify(proxyRes.headers, true, 2))
    });
}
  }

Object.keys(proxyTable).forEach(function (context) {
 var options = proxyTable[context]
 if (typeof options === 'string') {
   options = { target: options }
 }
 // 创建并使用代理
 app.use(proxyMiddleware(options.filter || context, options))
})
  app.listen(8000);
```
- option.pathRewrite： 对象/函数，重写目标url路径
- option.router：对象/函数，重新指定请求转发目标
- http-proxy 事件
 ```
 option.onError: 监听proxy错误事件
 
 option.onProxyRes：监听proxy的回应事件
 
 option.onProxyReq：监听proxy的请求事件
```

