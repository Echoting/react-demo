module.exports = {
    '/api': {
        // 目标服务器 host
        target: 'https://www.baidu.com/',
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
        // onProxyRes : proxy.on('proxyRes', function (proxyRes, req, res) {
        //     console.log('target', JSON.stringify(proxyRes.headers, true, 2))
        // })
    }
}
