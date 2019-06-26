/* eslint-disable no-unused-vars */
import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_POSTS, LIKE_POST, UNLIKE_POST } from './constants';
import {
  postsLoaded,
  loadPostsError,
  postLiked,
  likePostError,
  postUnliked,
  unlikePostError,
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

export default function* postFeedData() {
  yield takeLatest(LOAD_POSTS, getPosts);
  yield takeLatest(LIKE_POST, likePost);
  yield takeLatest(UNLIKE_POST, unlikePost);
}
