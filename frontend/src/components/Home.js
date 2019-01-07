import React, { Component } from 'react';
import Categories from './Categories';
import PostsMains from './PostsMain';
import Menu from './Menu';
import {
    Row,
    Col
} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Row className="mt-2">
                    <Col xs="12" md="2"><Categories/></Col>
                    <Col xs="12" md="10"><PostsMains/></Col>
                </Row>
            </div>
        );
    }
}

export default Home;