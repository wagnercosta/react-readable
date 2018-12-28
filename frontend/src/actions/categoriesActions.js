import {
  API_ID,
  BACKEND_ADDRESS
} from './consts';

// require('dotenv').config();
// const API_ID = process.env.REACT_TOKEN;
// const BACKEND_ADDRESS = process.env.BACKEND_ADRESS;


export const FETCH_CATEGORIES_BEGIN   = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});

export function fetchCategories() {
    return dispatch => {
      dispatch(fetchCategoriesBegin());
      return fetch(`${BACKEND_ADDRESS}/categories`, { headers: { 'Authorization': API_ID }})
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchCategoriesSuccess(json.categories));
          return json.categories;
        })
        .catch(error => dispatch(fetchCategoriesFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }