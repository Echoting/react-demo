import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './IndexPage/index';
import About from './AboutPage/index';
import App from './App';

const Routes = () => (
    <Router basename={location.pathname}>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Redirect to="/" />
            </Switch>
        </div>
    </Router>
)

export default Routes;