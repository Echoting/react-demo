import React from 'react'
import Routes from '../src/routes/index';

import {Provider} from 'mobx-react';
import stores from '../src/stores/index';
import '../src/App.less';

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="app">
                <Provider {...stores}>
                    <Routes />
                </Provider>
            </div>
        );
    }
};
export default App