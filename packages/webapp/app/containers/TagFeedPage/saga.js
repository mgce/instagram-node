/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_TAG } from './constants';
import { loadTag, loadTagError } from './actions';
import { mapPostsToDto } from 'utils/postMapper';

export function* getTag(tagName) {
  try {
    const response = yield call(request, {
      method: 'GET',
      url: 'tag/' + tagName,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const posts = mapPostsToDto(response.data.posts);
    yield put(loadTag(posts));
  } catch (err) {
    yield put(loadTagError(err));
  }
}

export default function* postFeedData() {
  yield takeLatest(LOAD_TAG, getTag);
}
