import {
    CHANGE_ORDER_ACTION
  } from '../actions/postsMainActions';

  const initialState = {
    orderBy: 'dateDesc'
  };
  


export default function orderReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_ORDER_ACTION:
            return {
                orderBy: action.orderBy
            }
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}