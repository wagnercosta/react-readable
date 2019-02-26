import {
    ADD_COMMENT_BEGIN,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE
  } from '../actions/comentsActions';

  const initialState = {
    post: [],
    loading: false,
    error: null,
    added: false
  };
  


export default function newCommentReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_COMMENT_BEGIN:
        return {
            ...state,
            loading: true,
            error: null,
            added: false
        };

        case ADD_COMMENT_SUCCESS:
        return {
            ...state,
            loading: false,
            comment: action.payload,
            added: true
        };

        case ADD_COMMENT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            comment: [],
            added: false
        };

        default:
        return state;
    }
}