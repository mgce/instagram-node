/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import { LOAD_POSTS } from './constants';
import { postsLoaded, loadPostsError } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getPosts() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, {
      method: "GET",
      url:"post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    yield put(postsLoaded(response.data.posts));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postFeedData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_POSTS, getPosts);
}
