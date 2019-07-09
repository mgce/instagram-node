import {
  GET_USER_POSTS,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,
} from './constants';

export function getUserPosts(userId) {
  return {
    type: GET_USER_POSTS,
    payload: {
      userId,
    },
  };
}

export function userPostsLoaded(post) {
  return {
    type: GET_USER_POSTS_SUCCESS,
    payload: {
      posts,
    },
  };
}

export function getUserPostsError(error) {
  return {
    type: GET_USER_POSTS_ERROR,
    error,
  };
}
