/**
 * @file: {{compClass}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的状态入口页面
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


export default class /*{{compStateClass}}*//*skip*/State/*skip*/ extends Component {

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
