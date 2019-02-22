import { combineReducers } from "redux";
import categories from "./categoriesReducer";
import posts from "./postsReducer";
import newPosts from "./newPostsReducer";
import Post from "./getPostReducer";

export default combineReducers({
  categories,
  posts,
  newPosts,
  Post
});