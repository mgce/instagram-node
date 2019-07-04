import { fromJS } from 'immutable';

import {
  LOAD_TAG,
  LOAD_TAG_SUCCESS,
  LOAD_TAG_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  tags: [],
});

function postFeedReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAG:
      return state.set('loading', true).set('error', false);
    case LOAD_TAG_SUCCESS:
      return state.set('posts', action.posts).set('loading', false);
    case LOAD_TAG_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default postFeedReducer;
