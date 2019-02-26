import {
  API_ID,
  BACKEND_ADDRESS
} from './consts';


export const FETCH_COMMENT_BEGIN   = 'FETCH_COMMENT_BEGIN';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';
export const ADD_COMMENT_BEGIN = 'ADD_COMMENT_BEGIN';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const EDIT_COMMENT_BEGIN = 'EDIT_COMMENT_BEGIN';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const GET_COMMENT_BEGIN   = 'GET_COMMENT_BEGIN';
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE';
export const CLEAR_ACTUAL_COMMENT = 'CLEAR_ACTUAL_COMMENT';



export const fetchCommentBegin = () => ({
  type: FETCH_COMMENT_BEGIN
});

export const fetchCommentSuccess = comments => ({
  type: FETCH_COMMENT_SUCCESS,
  payload: { comments }
});

export const fetchCommentFailure = error => ({
  type: FETCH_COMMENT_FAILURE,
  payload: { error }
});

export function fetchComment(id) {
  return dispatch => {
    dispatch(fetchCommentBegin());
    return fetch(`${BACKEND_ADDRESS}/posts/${id}/comments`, { headers: { 'Authorization': API_ID }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCommentSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchCommentFailure(error)));
  };
}

export const addCommentBegin = () => ({
  type: ADD_COMMENT_BEGIN
});

export const addCommentSuccess = comment => ({
  type: ADD_COMMENT_SUCCESS,
  payload: { comment }
});

export const addCommentFailure = error => ({
  type: ADD_COMMENT_FAILURE,
  payload: { error }
});

export function addComment(comment) {
  return dispatch => {
    dispatch(addCommentBegin());
    return fetch(`${BACKEND_ADDRESS}/comments`, 
        { "method": 'POST', 
          "headers": { 'Authorization': API_ID, "Content-Type": "application/json" }, 
          "body": JSON.stringify(comment) })
      .then(handleErrors)
      .then(json => {
         dispatch(addCommentSuccess(json));
         return({sucesso: true, comment: json.body})
      })
      .catch(error => dispatch(addCommentFailure(error)));
  };
}

export const getCommentBegin = () => ({
  type: GET_COMMENT_BEGIN
});

export const getCommentSuccess = comment => ({
  type: GET_COMMENT_SUCCESS,
  payload: { comment }
});

export const getCommentFailure = error => ({
  type: GET_COMMENT_FAILURE,
  payload: { error }
});

export function getComment(id) {
  return dispatch => {
    dispatch(getCommentBegin());
    return fetch(`${BACKEND_ADDRESS}/comments/${id}`, { headers: { 'Authorization': API_ID }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(getCommentSuccess(json));
        return json;
      })
      .catch(error => dispatch(getCommentFailure(error)));
  };
}

export const clearActualCommentEnd = () => ({
  type: CLEAR_ACTUAL_COMMENT
});

export function clearActualComment() {
  return dispatch => {
    dispatch(clearActualCommentEnd());
    return [];
  };
}


export const editCommentBegin = () => ({
  type: EDIT_COMMENT_BEGIN
});

export const editCommentSuccess = comment => ({
  type: EDIT_COMMENT_SUCCESS,
  payload: { comment }
});

export const editCommentFailure = error => ({
  type: EDIT_COMMENT_FAILURE,
  payload: { error }
});

export function editComment(comment) {
  return dispatch => {
    dispatch(editCommentBegin());
    return fetch(`${BACKEND_ADDRESS}/comment/${comment.id}`, 
        { "method": 'PUT', 
          "headers": { 'Authorization': API_ID, "Content-Type": "application/json" }, 
          "body": JSON.stringify({"timestamp": comment.timestamp, "body": comment.body }) })
      .then(handleErrors)
      .then(json => {
         dispatch(editCommentSuccess(json));
         return({sucesso: true})
      })
      .catch(error => dispatch(editCommentFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}