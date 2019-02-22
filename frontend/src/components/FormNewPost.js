import React, { Component } from 'react';
import { Formik, Field, Form as Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputComponent, SelectComponent, Fieldset } from './CustomComponents/HtmlComponents';
import { EditorState } from 'draft-js';
import { RichEditorComponent } from './CustomComponents/RichEditor';
import { ContentState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import { connect } from "react-redux";
import { addPost, getPost } from "../actions/postsActions";
import { Redirect, Link } from 'react-router-dom'



class FormNewPost extends Component {
  componentDidMount() {
    if(this.props.editing)
    {
      this.props.getPost(this.props.id);
    }
  }

  

  render() {
      let post = this.props.post;
      var stateFromHTML = require('draft-js-import-html').stateFromHTML;
      let contentState = stateFromHTML(post.body);
      
      return (
        <div>
        <h1>{this.props.editing ? 'Edit Post': 'New Post'}</h1>
        <Formik
          enableReinitialize
          initialValues={{
            title: post != null ? post.title : '',
            author: post != null ? post.author : '',
            category: post != null ? post.category : '',
            editorState: (post != null ? new EditorState.createWithContent(contentState): new EditorState.createEmpty()),
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .required('Title is required'),
              author: Yup.string().required('Post author is required'),
            category: Yup.string()
              .required('Please choose a category')
          })}
          onSubmit={(values, { setSubmitting }) => {
            //console.log(props)
            let html = stateToHTML(values.editorState.getCurrentContent());
            values.body = html;
    
            let post = {
              id: guid(),
              author: values.author,
              timestamp: Date.now(),
              title: values.title,
              body: values.body,
              author: values.author,
              category: values.category
            }
    
            this.props.newPost(post)
              .then((retorno) => {
                if(retorno.sucesso)
                {
                   this.props.history.push(`/`)
                }
                setSubmitting(false);
              });
    
    
          }}
    
          render={({ isSubmitting, handleReset, handleSubmit, errors, touched, values, handleBlur, setFieldValue, props }) => (
            <Form>
              <SelectComponent
                name="category"
                label="Post Category"
                component="select"
                helpmessage="Choose here the post category"
                errors={errors}
                touched={touched}
              >
                <option value="">Select a Category</option>
                {this.props.categories.map(categoria =>
                  <option key={categoria.name} value={categoria.name}>{categoria.name}</option> 
                )}
              </SelectComponent>
    
              <Field
                name="author"
                label="Author"
                helpmessage="Type here the post author" 
                placeholder="Post Author"
                component={InputComponent} 
              />
    
              <Field
                name="title"
                label="Title"
                helpmessage="Type here the post title" 
                placeholder="Post Title"
                value={values.title}
                component={InputComponent} 
              />
    
              <RichEditorComponent
                    editorState={values.editorState}
                    name="body"
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
    
                  {errors.name}
                  <Link to="/">
                    <button className="btn btn-danger" disabled={isSubmitting}>Back to Home</button>
                  </Link>

              <button
                type="button"
                className="btn btn-info"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                Reset 
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
      </div>
      );
  }
}


const mapStateToProps = state => ({
  postRetorno: state.posts.post,
  loading: state.posts.loading,
  error: state.posts.error,
  added: state.posts.added,
  post: state.Post.post
});

const mapDispatchToProps = dispatch => ({
  newPost: (post) => dispatch(addPost(post)),
  getPost: (id) => dispatch(getPost(id))
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewPost);