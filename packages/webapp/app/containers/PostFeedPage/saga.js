/* eslint-disable no-unused-vars */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_POSTS, LIKE_POST, UNLIKE_POST, LOAD_COMMENTS, ADD_COMMENT,
} from './constants';
import {
  postsLoaded,
  loadPostsError,
  postLiked,
  likePostError,
  postUnliked,
  unlikePostError,
  commentsLoaded,
  loadCommentsError,
  commentAdded,
  addCommentError,
} from './actions';

export function* getPosts() {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(postsLoaded(response.data.posts));
  } catch (err) {
    yield put(loadPostsError(err));
  }
}

export function* likePost({ postId }) {
  try {
    yield call(request, {
      method: 'POST',
      url: `post/${postId}/like`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(postLiked(postId));
  } catch (err) {
    yield put(likePostError(err));
  }
}

export function* unlikePost({ postId }) {
  try {
    yield call(request, {
      method: 'POST',
      url: `post/${postId}/unlike`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(postUnliked(postId));
  } catch (err) {
    yield put(unlikePostError(err));
  }
}

export function* getComments({ postId }) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: `post/${postId}/comment`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(commentsLoaded(response.data));
  } catch (err) {
    yield put(loadCommentsError(err));
  }
}

export function* addComment({ comment }) {
  try {
    const response = yield call(request, {
      method: 'POST',
      url: `post/${comment.postId}/comment`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { description: comment.description },
    });
    const commentData = {
      id: response.data.comment.id,
      postId: response.data.comment.postid,
      description: comment.description,
      liked: response.data.comment.liked,
      likes: response.data.comment.likes,
      username: response.data.comment.username,
      userId: response.data.comment.userid,
    };
    yield put(commentAdded(commentData));
  } catch (err) {
    yield put(addCommentError(err));
  }
}

export default function* postFeedData() {
  yield takeLatest(LOAD_POSTS, getPosts);
  yield takeLatest(LIKE_POST, likePost);
  yield takeLatest(UNLIKE_POST, unlikePost);
  yield takeLatest(LOAD_COMMENTS, getComments);
  yield takeLatest(ADD_COMMENT, addComment);
}
