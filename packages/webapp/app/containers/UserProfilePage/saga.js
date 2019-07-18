import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USER_POSTS, GET_USER_INFO } from './constants';
import {
  userPostsLoaded,
  getUserPostsError,
  userInfoLoaded,
  getUserInfoError,
} from './actions';
import { mapPostsToDto } from 'utils/postMapper';

export function* getUserPosts({ payload }) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: 'users/' + payload.userId + '/posts',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const posts = mapPostsToDto(response.data.posts);
    yield put(userPostsLoaded(payload.userId, posts));
  } catch (err) {
    yield put(getUserPostsError(err));
  }
}

export function* getUserInfo({ payload }) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: 'users/details',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(userInfoLoaded(response.data));
  } catch (err) {
    yield put(getUserInfoError(err));
  }
}

export default function* userPostsData() {
  yield takeLatest(GET_USER_POSTS, getUserPosts);
  yield takeLatest(GET_USER_INFO, getUserInfo);
}
