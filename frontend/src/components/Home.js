import React, { Component } from 'react';
import Categories from './Categories';
import PostsMains from './PostsMain';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
                    <Col xs="12" md="2"><Categories /></Col>
                    <Col xs="12" md="10"><PostsMains category={this.props.match.params.id} /></Col>
                </Row>
            </div>
        );
    }
}

export default Home;