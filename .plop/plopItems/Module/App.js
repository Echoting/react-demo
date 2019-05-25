import React from 'react'
import Routes from './routers';

// import {Provider} from 'mobx-react';
import './App.less';

class App extends React.Component {
    /* plop
    moduleClassName = '{{moduleCSSWrapper}}';
    plop */

    /*skip*/
    moduleClassName = 'module-wrapper';
    /*skip*/

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={this.moduleClassName}>
                <Routes />
            </div>
        );
    }
};
export default App