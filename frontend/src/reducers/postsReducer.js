import {
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    CHANGE_VOTE
  } from '../actions/postsActions';

  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  


export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
            ...state,
            loading: true,
            error: null
        };

        case FETCH_POSTS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
            ...state,
            loading: false,
            items: action.payload.posts
        };

        case FETCH_POSTS_FAILURE:
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
            items: []
        };
        case CHANGE_VOTE:
        {
            let allPosts = [...action.allPosts]
            allPosts.find(b => b.id === action.post.id).voteScore = action.post.voteScore;

            return {
                ...state,
                items: allPosts,
                loading: false,
                error: null
            }
        }
        default:
        // ALWAYS have a default case in a reducer
        return state;
    }
}