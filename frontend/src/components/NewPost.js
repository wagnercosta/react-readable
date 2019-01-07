import React from 'react';
import { Formik, Field, Form as Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputComponent, SelectComponent, Fieldset } from './CustomComponents/HtmlComponents';
import { EditorState } from 'draft-js';
import { RichEditorComponent } from './CustomComponents/RichEditor';
import {stateToHTML} from 'draft-js-export-html';
import { connect } from "react-redux";
import { addPost } from "../actions/postsActions";
import { Redirect } from 'react-router-dom'



const NewPost = props => (
  <div>
    <h1>New Post</h1>
    <Formik
      initialValues={{
        title: '',
        body: '',
        author: '',
        category: '',
        editorState: new EditorState.createEmpty()
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

        props.newPost(post)
          .then((retorno) => {
            if(retorno.sucesso)
            {
              props.history.push(`/`)
            }
            setSubmitting(false);
          });


      }}
      render={({ isSubmitting, handleReset, handleSubmit, errors, touched, values, handleBlur, setFieldValue, props}) => (
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
            <option value="react">react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
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
            component={InputComponent} 
          />

          <RichEditorComponent
                editorState={values.editorState}
                name="body"
                onChange={setFieldValue}
                onBlur={handleBlur}
              />

              {errors.name}
          <button
            type="reset"
            className="secondary"
            disabled={isSubmitting}
            onClick={handleReset}
          >
            Reset 
          </button>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
  </div>
);

const mapStateToProps = state => ({
  postRetorno: state.posts.post,
  loading: state.posts.loading,
  error: state.posts.error,
  added: state.posts.added
});

const mapDispatchToProps = dispatch => ({
  newPost: (post) => dispatch(addPost(post))
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

//export  NewPost;