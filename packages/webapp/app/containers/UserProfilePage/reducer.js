
import { fromJS } from 'immutable';

import { GET_USER_POSTS_SUCCESS, GET_USER_POSTS, GET_USER_POSTS_ERROR } from "./constants";

const initialState = fromJS({
    posts: {}
});

function userPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return state.set('loading', true).set('error', false);
    case GET_USER_POSTS_SUCCESS:
      return state
        .setIn(['posts', action.payload.tagName], action.payload.posts)
        .set('loading', false);
    case GET_USER_POSTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default userPostsReducer;
