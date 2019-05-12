import React from 'react'
import {Link} from 'react-router-dom'
import {inject} from 'mobx-react'

import { observable } from 'mobx';

// import TextareaNoScroll from 'textarea-no-scroll'

@inject('aboutStore')
class About extends React.Component {

    @observable test = 12355;
    render() {
        return (
            <div>
                <p>{this.props.aboutStore.title}</p>
                <p> {this.test}</p>
                {/*<TextareaNoScroll />*/}
                <Link to="/">go to Home</Link>
            </div>
        )
    }
}

export default About;