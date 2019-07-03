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
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  posts: [],
  comments: {},
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
        .updateIn(['posts'], arr => arr.concat([action.post]))
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
        .updateIn(['posts'], postList => postList.map((item) => {
          if (item.id !== action.postId) return item;
          const newItem = item;
          newItem.likes += 1;
          newItem.liked = true;
          return newItem;
        }))
        .set('loading', false);
    }
    case LIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    case UNLIKE_POST:
      return state.set('loading', true).set('error', false);
    case UNLIKE_POST_SUCCESS:
      return state
        .updateIn(['posts'], postList => postList.map((item) => {
          if (item.id !== action.postId) return item;
          const newItem = item;
          newItem.likes -= 1;
          newItem.liked = false;
          return newItem;
        }))
        .set('loading', false);
    case UNLIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    case LOAD_COMMENTS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_COMMENTS_SUCCESS:
        const loadCommentsState = state.get('comments').toJS();
        if(loadCommentsState[action.data.postId] === undefined)
          loadCommentsState[action.data.postId] = action.data.comments
        else
          loadCommentsState[action.data.postId].push(action.data.comments);
      return state
        .set('comments', fromJS(loadCommentsState))
        .set('loading', false);
    case LOAD_COMMENTS_ERROR:
      return state.set('error', action.error).set('loading', false);

    case ADD_COMMENT:
      return state
        .set('loading', true)
        .set('error', false);
    case ADD_COMMENT_SUCCESS:
      const addCommentState = state.get('comments').toJS();
      addCommentState[action.comment.postId].push(action.comment);
      return state
      .set('comments', fromJS(addCommentState))
        .set('loading', false);
    case ADD_COMMENT_ERROR:
      return state.set('error', action.error).set('loading', false);

    default:
      return state;
  }
}

export default postFeedReducer;
