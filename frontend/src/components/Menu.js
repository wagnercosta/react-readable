import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Menu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar color="primary" dark expand="md">
                <Link className="navbar-brand" to="/">Readable</Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <li className="nav-item">
                            <Link className="nav-link" to="/NewPost">New Post</Link>
                        </li>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Menu;