import {
    EDIT_COMMENT_BEGIN,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE
  } from '../actions/comentsActions';

  const initialState = {
    comment: [],
    loading: false,
    error: null,
  };
  


export default function editCommentReducer(state = initialState, action) {
    switch(action.type) {
        case EDIT_COMMENT_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };

        case EDIT_COMMENT_SUCCESS:
        return {
            ...state,
            loading: false,
            comment: action.payload
        };

        case EDIT_COMMENT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            comment: []
        };

        default:
        return state;
    }
}