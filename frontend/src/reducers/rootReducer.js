import { combineReducers } from "redux";
import categories from "./categoriesReducer";
import posts from "./postsReducer";
import newPosts from "./newPostsReducer";
import Post from "./getPostReducer";
import editPost from "./editPostsReducer";
import order from "./orderReducer";
import editComment from "./editCommentReducer";
import fetchComments from "./fetchCommentsReducer";
import getComment from "./getCommentReducer";
import newComment from "./newCommentReducer";
import votePost from "./votePostsReducer";

export default combineReducers({
  categories,
  posts,
  newPosts,
  Post,
  editPost,
  order,
  editComment,
  fetchComments,
  getComment,
  newComment,
  votePost
});