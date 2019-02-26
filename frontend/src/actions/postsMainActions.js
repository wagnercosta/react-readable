
  export const CHANGE_ORDER_ACTION   = 'CHANGE_ORDER_ACTION';
  
  export const changeOrderAction = orderBy => ({
    type: CHANGE_ORDER_ACTION,
    orderBy: orderBy
  });
  
  export function changeOrder(orderBy) {
      return dispatch => {
        dispatch(changeOrderAction(orderBy));
    }
  }