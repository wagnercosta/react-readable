import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'reactstrap';
import NewPost from './NewPost';
import ViewPost from './ViewPost';

class App extends Component {
    render() {
        return (
            <Container fluid>
                <Route exact path="/" component={Home} />
                <Route exact path="/category/:id" component={Home} />
                <Route path="/NewPost" component={NewPost} />
                <Route exact path="/EditPost/:id" component={NewPost} />
                <Route exact path="/ViewPost/:id" component={ViewPost} />
            </Container>
        );
    }
}

export default App;