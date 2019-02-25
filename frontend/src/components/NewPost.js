import React, { Component } from 'react';
import Categories from './Categories';
import PostsMains from './PostsMain';
import Menu from './Menu';
import FormNewPost from './FormNewPost';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { fetchCategories } from "../actions/categoriesActions"

class NewPost extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
    }
    

    render() {
        let id = this.props.match.params.id
        let editing = false;
        if(id !== undefined) editing = true;

        return (
            <div>
                <Menu/>
                <div className="row mt-2">
                    <div className="col-12"
                    ><FormNewPost history={this.props.history} categories={this.props.categories} editing={editing} id={id} /></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items
});

export default connect(mapStateToProps)(NewPost);