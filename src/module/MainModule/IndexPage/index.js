import React from 'react';
import { Link } from 'react-router-dom';
import {inject} from 'mobx-react';
import {observable} from 'mobx';


// @inject('homeStore')
class Home extends React.Component {

    @observable title = 'this is home page';

    componentWillMount() {
        // fetch('/api').then(function(response){
        //     console.log(666)
        // });

        // mock 数据的get请求
        fetch('/success', {
            method: "get",
            credentials: 'include'

        }).then(response => {

            let resData = response.json();
            return resData;

        }).then(value => {
            console.log(888, value);
        }).catch((error) => {
            console.log(error)
        });

        // mock 数据的post请求
        const params = {
            id: "id",
        };

        fetch('/failure', {
            method: 'POST',
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
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