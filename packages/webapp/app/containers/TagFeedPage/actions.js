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

export function tagLoaded(tagName, posts) {
  return {
    type: LOAD_TAG_SUCCESS,
    payload: {
      tagName,
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
