import {
  API_ID,
  BACKEND_ADDRESS
} from './consts';

// require('dotenv').config();
// const API_ID = process.env.REACT_TOKEN;
// const BACKEND_ADDRESS = process.env.BACKEND_ADRESS;


export const FETCH_POSTS_BEGIN   = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_POST_BEGIN = 'ADD_POST_BEGIN';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return fetch(`${BACKEND_ADDRESS}/posts`, { headers: { 'Authorization': API_ID }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

export const addPostBegin = () => ({
  type: ADD_POST_BEGIN
});

export const addPostSuccess = post => ({
  type: ADD_POST_SUCCESS,
  payload: { post }
});

export const addPostFailure = error => ({
  type: ADD_POST_FAILURE,
  payload: { error }
});

export function addPost(post) {
  return dispatch => {
    dispatch(addPostBegin());
    return fetch(`${BACKEND_ADDRESS}/posts`, 
        { "method": 'POST', 
          "headers": { 'Authorization': API_ID, "Content-Type": "application/json" }, 
          "body": JSON.stringify(post) })
      .then(handleErrors)
      .then(json => {
         dispatch(addPostSuccess(json));
         return({sucesso: true})
      })
      .catch(error => dispatch(addPostFailure(error)));
  };
}
  
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}