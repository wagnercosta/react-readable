import React, { Component } from 'react';
import { Formik, Field, Form as Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputComponent, SelectComponent, Fieldset } from './CustomComponents/HtmlComponents';
import { EditorState } from 'draft-js';
import { RichEditorComponent } from './CustomComponents/RichEditor';
import { ContentState } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import { connect } from "react-redux";
import { addPost, getPost, clearActualPost, editPost } from "../actions/postsActions";
import { Redirect, Link } from 'react-router-dom'



class FormNewPost extends Component {
  componentDidMount() {
    if(this.props.editing)
    {
      this.props.getPost(this.props.id);
    }
    else
    {
      this.props.clearActualPost();
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
            title: post != undefined && post.title != undefined ? post.title : '',
            author: post != undefined && post.author != undefined ? post.author : '',
            category: post != undefined && post.category != undefined ? post.category : '',
            editorState: (post != undefined && post.body != undefined ? new EditorState.createWithContent(contentState): new EditorState.createEmpty()),
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
            
            let id = ""

            if(this.props.editing)
            {
              id = this.props.id;
            }
            else
            {
              id = guid()
            }
            
            let post = {
              id: id,
              author: values.author,
              timestamp: Date.now(),
              title: values.title,
              body: values.body,
              author: values.author,
              category: values.category
            }
    
            if(this.props.editing)
            {
            this.props.editPost(post)
              .then((retorno) => {
                if(retorno.sucesso)
                {
                   this.props.history.push(`/`)
                }
                setSubmitting(false);
              });
            }
            else
            {
              this.props.newPost(post)
              .then((retorno) => {
                if(retorno.sucesso)
                {
                   this.props.history.push(`/`)
                }
                setSubmitting(false);
              });
            }
            
    
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
                disabled={this.props.editing}
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
                value={values.author}
                component={InputComponent} 
                touched={touched}
                disabled={this.props.editing}
              />
    
              <Field
                name="title"
                label="Title"
                helpmessage="Type here the post title" 
                placeholder="Post Title"
                value={values.title}
                component={InputComponent}
                touched={touched}
              />

              <div className="form-group">
              <RichEditorComponent
                    editorState={values.editorState}
                    name="body"
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
    
                  {errors.name}
              </div>

              <Link to="/">
                <button className="btn btn-danger" disabled={isSubmitting}>Back to Home</button>
              </Link>
              
              {!this.props.editing ? (
              <button
                type="button"
                className="btn btn-info ml-2"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                Reset 
              </button>) : ""}
              
              <button type="submit" className="btn btn-primary ml-2" disabled={isSubmitting}>
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
  getPost: (id) => dispatch(getPost(id)),
  clearActualPost: () => dispatch(clearActualPost()),
  editPost: (post) => dispatch(editPost(post))
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