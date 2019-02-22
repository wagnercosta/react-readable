import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'reactstrap';
import NewPost from './NewPost';

class App extends Component {
    render() {
        return (
            <Container fluid>
                <Route exact path="/" component={Home} />
                <Route exact path="/category/:id" component={Home} />
                <Route path="/NewPost" component={NewPost} />
            </Container>
        );
    }
}

//Just for tests
//const NewPost = () => <h2>Home</h2>;


export default App;