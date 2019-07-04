import { LOAD_TAG, LOAD_TAG_SUCCESS, LOAD_TAG_ERROR } from './constants';

// Load tag

export function loadTag(tagName) {
  return {
    type: LOAD_TAG,
    payload: {
      tagName,
    },
  };
}

export function tagLoaded(posts) {
  return {
    type: LOAD_TAG_SUCCESS,
    payload: {
      posts,
    },
  };
}

export function loadTagError(err) {
  return {
    type: LOAD_TAG_ERROR,
    err,
  };
}
