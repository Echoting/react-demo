import React from 'react';
import { Link } from 'react-router-dom';
import {inject} from 'mobx-react';
import {observable} from 'mobx';

class Home extends React.Component {

    @observable title = 'this is home page';

    render() {
        return (
            <div>
                <p>{this.title}</p>
            </div>
        );
    }
}

export default Home;