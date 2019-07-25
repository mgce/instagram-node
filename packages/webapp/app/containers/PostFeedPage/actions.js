import {
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LIKE_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './constants';

// Add post

export function addPost() {
  return {
    type: ADD_POST,
  };
}

export function postAdded(post) {
  return {
    type: ADD_POST_SUCCESS,
    post,
  };
}

export function addPostError(err) {
  return {
    type: ADD_POST_ERROR,
    err,
  };
}

// Load posts

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function postsLoaded(posts) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
  };
}

export function loadPostsError(err) {
  return {
    type: LOAD_POSTS_ERROR,
    err,
  };
}

// Like post

export function likePost(postId) {
  return {
    type: LIKE_POST,
    postId
  };
}

export function postLiked(postId) {
  return {
    type: LIKE_POST_SUCCESS,
    postId,
  };
}

export function likePostError(err) {
  return {
    type: LIKE_POST_ERROR,
    err
  };
}

// Unlike post

export function unlikePost(postId) {
  return {
    type: UNLIKE_POST,
    postId
  };
}

export function postUnliked(postId) {
  return {
    type: UNLIKE_POST_SUCCESS,
    postId,
  };
}

export function unlikePostError(err) {
  return {
    type: UNLIKE_POST_ERROR,
    err
  };
}

// load comments

export function loadComments(postId) {
  return {
    type: LOAD_COMMENTS,
    postId
  };
}

export function commentsLoaded(data) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    data,
  };
}

export function loadCommentsError(err) {
  return {
    type: LOAD_COMMENTS_ERROR,
    err,
  };
}

// add comment

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function commentAdded(comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment,
  };
}

export function addCommentError(err) {
  return {
    type: ADD_COMMENT_ERROR,
    err,
  };
}

// delete comment

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    payload:{
      commentId
    }
  };
}

export function commentDeleted(commentId) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload:{
      commentId
    },
  };
}

export function deleteCommentError(err) {
  return {
    type: DELETE_COMMENT_ERROR,
    err,
  };
}
