import {
  GET_USER_POSTS,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from './constants';

export function getUserPosts(userId) {
  return {
    type: GET_USER_POSTS,
    payload: {
      userId,
    },
  };
}

export function userPostsLoaded(postId, posts) {
  return {
    type: GET_USER_POSTS_SUCCESS,
    payload: {
      postId,
      posts
    },
  };
}

export function getUserPostsError(error) {
  return {
    type: GET_USER_POSTS_ERROR,
    error,
  };
}

//Load user info

export function getUserInfo(userId) {
  return {
    type: GET_USER_INFO,
    payload: {
      userId,
    },
  };
}

export function userInfoLoaded(user) {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: {
      user
    },
  };
}

export function getUserInfoError(error) {
  return {
    type: GET_USER_INFO_ERROR,
    error,
  };
}