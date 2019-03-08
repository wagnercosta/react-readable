import React, { Component } from 'react';
import Menu from './Menu';
import { connect } from "react-redux";
import { getPost } from "../actions/postsActions";
import { PostDetail } from "./PostDetail";
import { fetchComment, addComment, editComment } from "../actions/comentsActions";
import { Button } from 'reactstrap';
import Comments from './Comments';
import CommentModal from './CommentModal';



class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          editingComment: false,
          currentComment: []
        };
    
        this.toggle = this.toggle.bind(this);
      }

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
        this.props.fetchComment(this.props.match.params.id);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
    addCommentHandler = () => {
        this.setState({
            editingComment: false,
            currentComment: undefined
        });
        this.toggle();
    }

    editCommentHandler = (comment) => {
        this.setState({
            editingComment: true,
            currentComment: comment
        });
        this.toggle();
    }

    

    render() {
        let post = this.props.post
        let comments = []
        
        if(this.props.comments !== undefined)
        {
            comments = this.props.comments
        }

        return (
            <div>
                <Menu/>
                <PostDetail post={post} />
                <Comments comments={comments} editCommentHandler={this.editCommentHandler} />
                <CommentModal 
                    toggle={this.toggle} 
                    modal={this.state.modal} 
                    className={this.props.className} 
                    addComment={this.props.addComment}
                    editComment={this.props.editComment} 
                    fetchComment={this.props.fetchComment}
                    postId={this.props.match.params.id}
                    editing={this.state.editingComment}
                    comment={this.state.currentComment}
                     />


                <div className="row">
                    <div className="col-12">
                        <Button color="danger" onClick={this.addCommentHandler}>
                            Add Comment
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    loading: state.posts.loading,
    post: state.Post.post,
    comments: state.fetchComments.comments
  });
  
const mapDispatchToProps = dispatch => ({
    getPost: (id) => dispatch(getPost(id)),
    fetchComment: (id) => dispatch(fetchComment(id)),
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment))
});
  

  
export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);