import { combineReducers } from "redux";
import categories from "./categoriesReducer";
import posts from "./postsReducer";
import newPosts from "./newPostsReducer";

export default combineReducers({
  categories,
  posts,
  newPosts
});