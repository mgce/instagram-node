/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_TAG } from './constants';
import { tagLoaded, loadTagError } from './actions';
import { mapPostsToDto } from 'utils/postMapper';

export function* getTag({payload}) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: 'tag/' + payload.tagName,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const posts = mapPostsToDto(response.data.posts);
    yield put(tagLoaded(posts));
  } catch (err) {
    yield put(loadTagError(err));
  }
}

export default function* postFeedData() {
  yield takeLatest(LOAD_TAG, getTag);
}
