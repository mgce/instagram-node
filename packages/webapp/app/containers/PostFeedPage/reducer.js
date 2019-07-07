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
        .updateIn(['posts'], postList =>
          postList.map(item => {
            if (item.id !== action.postId) return item;
            const newItem = item;
            newItem.likesCount += 1;
            newItem.liked = true;
            return newItem;
          }),
        )
        .set('loading', false);
    }
    case LIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    case UNLIKE_POST:
      return state.set('loading', true).set('error', false);
    case UNLIKE_POST_SUCCESS:
      return state
        .updateIn(['posts'], postList =>
          postList.map(item => {
            if (item.id !== action.postId) return item;
            const newItem = item;
            newItem.likesCount -= 1;
            newItem.liked = false;
            return newItem;
          }),
        )
        .set('loading', false);
    case UNLIKE_POST_ERROR:
      return state.set('error', action.error).set('loading', false);

    case LOAD_COMMENTS:
      return state.set('loading', true).set('error', false);
    case LOAD_COMMENTS_SUCCESS:
      return state
        .setIn(['comments', action.data.postId], action.data.comments)
        .set('loading', false);
    case LOAD_COMMENTS_ERROR:
      return state.set('error', action.error).set('loading', false);

    case ADD_COMMENT:
      return state.set('loading', true).set('error', false);
    case ADD_COMMENT_SUCCESS:
      return state
        .setIn(
          ['comments', action.comment.postId],
          state
            .get('comments')
            .get(action.comment.postId.toString())
            .push(action.comment),
        )
        .set('loading', false);
    case ADD_COMMENT_ERROR:
      return state.set('error', action.error).set('loading', false);

    default:
      return state;
  }
}

export default postFeedReducer;
