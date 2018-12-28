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
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }