import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// 应用文件
import App from './App'


ReactDOM.render(
<AppContainer>
<App/>
</AppContainer>
    , document.getElementById('app'))


// 热更新
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app')
        )
    })
}