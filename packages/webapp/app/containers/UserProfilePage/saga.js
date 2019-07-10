import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USER_POSTS } from './constants';
import { userPostsLoaded, getUserPostsError } from './actions';
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

export default function* userPostsData() {
  yield takeLatest(GET_USER_POSTS, getUserPosts);
}
