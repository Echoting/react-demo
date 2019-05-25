import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './IndexPage/index';

const Routes = () => (
    <Router basename={location.pathname}>
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Redirect to="/" />
            </Switch>
        </div>
    </Router>
)

export default Routes;