import {
    GET_COMMENT_BEGIN,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILURE,
    CLEAR_ACTUAL_COMMENT,
  } from '../actions/comentsActions';

  const initialState = {
    comment: [],
    loading: false,
    error: null
  };
  


export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_COMMENT_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };

        case GET_COMMENT_SUCCESS:
        return {
            ...state,
            loading: false,
            comment: action.payload.comment
        };

        case GET_COMMENT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            comment: []
        };

        case CLEAR_ACTUAL_COMMENT:
            return {
                ...state,
                loading: false,
                comment: []
            };
        default:
        return state;
    }
}