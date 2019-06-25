import { fromJS } from 'immutable';

import {
  ADD_POST_SUCCESS,
  ADD_POST,
  ADD_POST_ERROR,
} from 'containers/AddPostPage/constants';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LIKE_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  posts: [],
});

function postFeedReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['posts'], []);
    case ADD_POST_SUCCESS:
      return state
        .updateIn(['posts'], (arr) => arr.concat([action.post]))
        .set('loading', false);
    case ADD_POST_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_POSTS:
      return state.set('loading', true).set('error', false);
    case LOAD_POSTS_SUCCESS:
      return state.set('posts', action.posts).set('loading', false);
    case LOAD_POSTS_ERROR:
      return state.set('error', action.error).set('loading', false);

    case LIKE_POST:
      return state.set('loading', true).set('error', false);
    case LIKE_POST_SUCCESS: {
      return state
        .updateIn(['posts'], (postList) => postList.map((item) => {
          if (item.id !== action.postId) return item;
          item.likes += 1;
          return item;
        }))
        .set('loading', false);
    }
    case LIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    case UNLIKE_POST:
      return state.set('loading', true).set('error', false);
    case UNLIKE_POST_SUCCESS:
      return state.set('posts', action.posts).set('loading', false);
    case UNLIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    default:
      return state;
  }
}

export default postFeedReducer;
