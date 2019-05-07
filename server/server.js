const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../config/webpack.config.dev.js')
const express = require('express')
const app = new express()
// 本地预览代码的端口
const port = 3003
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}))
app.use(webpackHotMiddleware(compiler))


app.use(express.static(path.resolve(__dirname, '../dist/assets')))

// app.get('*', function(req, res) {
//     res.sendFile(__dirname + '/index.html')
//     // res.sendFile(path.resolve(__dirname, '../dist/assets/index.html'))
// })

// console.log('..........................', __dirname)
//

app.listen(port, function(error) {
    if (error) {
        /*eslint no-console: 0*/
        console.error(error)
    } else {
        /*eslint no-console: 0*/
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})