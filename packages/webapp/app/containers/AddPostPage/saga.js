/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from "redux-saga/effects";
import { ADD_POST } from "containers/UserProfilePage/constants";
import { postAdded, addPostError } from "containers/UserProfilePage/actions";
import { history } from "utils/history";

import request from "utils/request";

/**
 * Github repos request/response handler
 */
export function* addPost(data) {
  try {
    // Call our request helper (see 'utils/request')
    const imageResponse = yield call(request, {
      method: "POST",
      url: "image/upload",
      data: data.image,
      headers: {
        Accept: "application/json"
      }
    });
    console.log(imageResponse);
    const postData = {
      imageId: imageResponse.data.imageid,
      description: data.description,
      userId: 1
    };

    // const postDataAsJson = JSON.stringify(postData);

    const postResponse = yield call(request, {
      method: "POST",
      url: "post",
      data: postData,
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
      }
    });

    postData["id"] = postResponse.data.postId;

    yield put(postAdded(postData));
    history.push('')
  } catch (err) {
    console.log(err);
    yield put(addPostError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postData() {
  yield takeLatest(ADD_POST, addPost);
}
