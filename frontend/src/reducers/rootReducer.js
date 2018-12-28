import { combineReducers } from "redux";
import categories from "./categoriesReducer";
import posts from "./postsReducer";

export default combineReducers({
  categories,
  posts
});