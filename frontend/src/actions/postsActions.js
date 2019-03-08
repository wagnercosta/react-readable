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
export const CHANGE_VOTE = 'CHANGE_VOTE';
export const ADD_POST_BEGIN = 'ADD_POST_BEGIN';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const EDIT_POST_BEGIN = 'EDIT_POST_BEGIN';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
export const GET_POST_BEGIN   = 'GET_POST_BEGIN';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';
export const CLEAR_ACTUAL_POST = 'CLEAR_ACTUAL_POST';
export const VOTE_POST_BEGIN = 'VOTE_POST_BEGIN';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';



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

export const changeVote = (post, allPosts) => ({
  type: CHANGE_VOTE,
  post: post,
  allPosts: allPosts
})


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

export const getPostBegin = () => ({
  type: GET_POST_BEGIN
});

export const getPostSuccess = post => ({
  type: GET_POST_SUCCESS,
  payload: { post }
});

export const getPostFailure = error => ({
  type: GET_POST_FAILURE,
  payload: { error }
});

export function getPost(id) {
  return dispatch => {
    dispatch(getPostBegin());
    return fetch(`${BACKEND_ADDRESS}/posts/${id}`, { headers: { 'Authorization': API_ID }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(getPostSuccess(json));
        return json;
      })
      .catch(error => dispatch(getPostFailure(error)));
  };
}

export const clearActualPostEnd = () => ({
  type: CLEAR_ACTUAL_POST
});

export function clearActualPost() {
  return dispatch => {
    dispatch(clearActualPostEnd());
    return [];
  };
}


export const editPostBegin = () => ({
  type: EDIT_POST_BEGIN
});

export const editPostSuccess = post => ({
  type: EDIT_POST_SUCCESS,
  payload: { post }
});

export const editPostFailure = error => ({
  type: EDIT_POST_FAILURE,
  payload: { error }
});

export function editPost(post) {
  return dispatch => {
    dispatch(editPostBegin());
    return fetch(`${BACKEND_ADDRESS}/posts/${post.id}`, 
        { "method": 'PUT', 
          "headers": { 'Authorization': API_ID, "Content-Type": "application/json" }, 
          "body": JSON.stringify({"title": post.title, "body": post.body }) })
      .then(handleErrors)
      .then(json => {
         dispatch(editPostSuccess(json));
         return({sucesso: true})
      })
      .catch(error => dispatch(editPostFailure(error)));
  };
}


export const votePostBegin = () => ({
  type: VOTE_POST_BEGIN
});

export const votePostSuccess = json => ({
  type: VOTE_POST_SUCCESS,
  payload: { json }
});

export const votePostFailure = error => ({
  type: VOTE_POST_FAILURE,
  payload: { error }
});

export function votePost(option, id, allPosts) {
  return dispatch => {
    dispatch(votePostBegin());
    return fetch(`${BACKEND_ADDRESS}/posts/${id}`, 
        { "method": 'POST', 
          "headers": { 'Authorization': API_ID, "Content-Type": "application/json" }, 
          "body": JSON.stringify({"option": option }) })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
         dispatch(votePostSuccess(json));
         dispatch(changeVote(json, allPosts))
         return({sucesso: true})
      })
      .catch(error => dispatch(votePostFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}