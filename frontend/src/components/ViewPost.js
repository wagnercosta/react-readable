import React, { Component } from 'react';
import Categories from './Categories';
import PostsMains from './PostsMain';
import Menu from './Menu';
import FormNewPost from './FormNewPost';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { fetchCategories } from "../actions/categoriesActions"
import { getPost } from "../actions/postsActions";


class ViewPost extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.getPost(this.props.match.params.id);
    }
    

    render() {
        let post = this.props.post
        return (
            <div>
                <Menu/>
                <div className="row mt-2">
                    <div className="col-12">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="col-12">
                        <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    categories: state.categories.items,
    loading: state.posts.loading,
    post: state.Post.post
  });
  
  const mapDispatchToProps = dispatch => ({
    getPost: (id) => dispatch(getPost(id)),
    fetchCategories: () => dispatch(fetchCategories()),
  });
  
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);