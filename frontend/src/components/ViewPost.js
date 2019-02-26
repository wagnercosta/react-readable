import React, { Component } from 'react';
import Categories from './Categories';
import PostsMains from './PostsMain';
import Menu from './Menu';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { fetchCategories } from "../actions/categoriesActions"
import { getPost } from "../actions/postsActions";
import { dataFormatadaFromTimeStamp } from "../utils/utils";
import { PostDetail } from "./PostDetail";
import { fetchComment, addComment } from "../actions/comentsActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Field, Form as Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputComponent, SelectComponent, Fieldset } from './CustomComponents/HtmlComponents';



class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
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

    

    render() {
        let post = this.props.post
        let comments = []
        let comment = []
        
        if(this.props.comments != undefined)
        {
            comments = this.props.comments
        }
        //this.props.comments

        return (
            <div>
                <Menu/>
                <PostDetail post={post} />

                <div className="row">
                    <div className="col-12">
                        <Button color="danger" onClick={this.toggle}>
                            Add Comment
                        </Button>
                    </div>
                    
                    {comments.map(comment => 
                        <div key={comment.id} className="col-12">
                            <p><strong>{comment.author}</strong></p>
                            <p>{comment.body}</p>
                            <hr />
                        </div>
                    )}
                </div>

                    <Formik
                        enableReinitialize
                        initialValues={{
                            body: comment != undefined && comment.body != undefined ? comment.body : '',
                            author: comment != undefined && comment.author != undefined ? comment.author : '',
                        }}
                        validationSchema={Yup.object().shape({
                            body: Yup.string()
                            .required('Body is required'),
                            author: Yup.string().required('Post author is required')
                        })}

                        onSubmit={(values, { setSubmitting }) => {
                            let comment = {
                                id: guid(),
                                author: values.author,
                                timestamp: Date.now(),
                                title: values.title,
                                body: values.body,
                                parentId: this.props.match.params.id
                            }
                    
                            this.props.addComment(comment)
                                .then((retorno) => {
                                this.props.fetchComment(this.props.match.params.id);
                                setSubmitting(false);
                                values.author = "";
                                values.body = "";
                                this.toggle();
                            });
                        }}
    
                        render={({ isSubmitting, handleReset, handleSubmit, errors, touched, values, handleBlur, setFieldValue, props }) => (
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            
                            <Form>
                            <ModalBody>
                                <Field
                                    name="author"
                                    label="Author"
                                    helpmessage="Type here the comment author" 
                                    placeholder="Comment Author"
                                    value={values.author}
                                    component={InputComponent} 
                                    touched={touched}
                                />
                    
                            <Field
                                name="body"
                                label="Body"
                                helpmessage="Type here the comment body" 
                                placeholder="Comment"
                                value={values.body}
                                component={InputComponent}
                                touched={touched}
                            />
                                </ModalBody>
                                <ModalFooter>
                                    <button type="submit" className="btn btn-primary ml-2">
                                        Submit
                                    </button>
                                    {' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Form>
                            </Modal>

                            )}
                            />


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
    addComment: (comment) => dispatch(addComment(comment))
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