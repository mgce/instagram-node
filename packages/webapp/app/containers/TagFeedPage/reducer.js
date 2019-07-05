import { fromJS } from 'immutable';

import { LOAD_TAG, LOAD_TAG_SUCCESS, LOAD_TAG_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  tags: {},
});

function tagsFeedReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAG:
      return state.set('loading', true).set('error', false);
    case LOAD_TAG_SUCCESS:
      const loadTagsState = state.get('comments').toJS();
      if (loadTagsState[action.data.postId] === undefined)
        loadTagsState[action.data.postId] = action.data.comments;
      else loadTagsState[action.data.postId].push(action.data.comments);
      return state.set('tags', action.posts).set('loading', false);
    case LOAD_TAG_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default tagFeedReducer;
