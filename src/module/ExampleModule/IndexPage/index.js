import React from 'react';
import { Link } from 'react-router-dom';
import {inject} from 'mobx-react';
import {observable} from 'mobx';


// @inject('homeStore')
class Home extends React.Component {

    @observable title = 'this is home page';

    componentWillMount() {
        fetch('/api').then(function(response){
            console.log(666)
        });
    }

    render() {
        return (
            <div>
                <p>{this.title}</p>
                <Link to="/about">go to About</Link>
            </div>
        );
    }
}

export default Home;