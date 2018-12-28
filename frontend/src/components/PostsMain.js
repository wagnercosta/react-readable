import React from 'react';
import { Card, CardBody, CardTitle, CardText,  CardHeader, CardSubtitle } from 'reactstrap';
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postsActions";


class Posts extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchPosts());
    }
  
    render() {
      const { error, loading, posts } = this.props;
  
      if (error) {
        return <div>Error! {error.message}</div>;
      }
  
      if (loading) {
        return <div>Loading...</div>;
      }
      
    return (
      <div>
        {posts.map(post => 
        <Card body key={post.id} className="mt-2">
          <CardTitle>{post.title}</CardTitle>
          <CardText>{post.body}</CardText>
        </Card>
        )}
      </div>
  );
  };
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(Posts);