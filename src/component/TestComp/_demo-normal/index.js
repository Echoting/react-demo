/**
 * @file: Test 状态对象
 * @author: Echoting
 * @date: 2019-05-25
 * @description: Test 的状态入口页面
 */
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
    extendObservable,
    computed,
    observable,
    action
} from 'mobx';
import compStyle from './style.use.less';


export default class TestState extends Component {

    // Reaction 控制

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        compStyle.use();
    }

    componentWillUnmount() {
        compStyle.unuse();
    }

    @observer
    render() {

    }

}
