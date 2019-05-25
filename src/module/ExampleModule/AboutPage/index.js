import React from 'react'
import {Link} from 'react-router-dom'
import {inject} from 'mobx-react'

import { observable } from 'mobx';

// import TextareaNoScroll from 'textarea-no-scroll'

// @inject('aboutStore')
class About extends React.Component {

    @observable title = 'this is about page';
    render() {
        return (
            <div>
                <p>{this.title}</p>
                {/*<TextareaNoScroll />*/}
                <Link to="/">go to Home</Link>
            </div>
        )
    }
}

export default About;