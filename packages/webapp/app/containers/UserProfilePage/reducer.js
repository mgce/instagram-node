import { fromJS } from 'immutable';

import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  GET_USER_POSTS,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,
} from './constants';

const initialState = fromJS({
  posts: {},
  users: {}
});

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return state.set('loading', true).set('error', false);
    case GET_USER_POSTS_SUCCESS:
      return state
        .setIn(['posts', action.payload.postId], action.payload.posts)
        .set('loading', false);
    case GET_USER_POSTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case GET_USER_INFO:
      return state.set('loading', true).set('error', false);
    case GET_USER_INFO_SUCCESS:
      return state
        .setIn(['users', action.payload.user.id], action.payload.user)
        .set('loading', false);
    case GET_USER_INFO_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}