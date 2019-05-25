import React from 'react'
import Routes from './routers';

// import {Provider} from 'mobx-react';
import './App.less';

class App extends React.Component {
    moduleClassName = 'example-module';

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={this.moduleClassName}>
                {/*{this.props.children}*/}
                <Routes />
            </div>
        );
    }
};
export default App