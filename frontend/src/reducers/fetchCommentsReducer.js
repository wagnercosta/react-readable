import {
    FETCH_COMMENT_BEGIN,
    FETCH_COMMENT_SUCCESS,
    FETCH_COMMENT_FAILURE
  } from '../actions/comentsActions';

  const initialState = {
    comments: [],
    loading: false,
    error: null
  };
  


export default function fetchCommentsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_COMMENT_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };

        case FETCH_COMMENT_SUCCESS:
        return {
            ...state,
            loading: false,
            ...action.payload
        };

        case FETCH_COMMENT_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            comments: []
        };

        default:
        // ALWAYS have a default case in a reducer
        return state;
    }
}