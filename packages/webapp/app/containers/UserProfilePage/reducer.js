/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { ADD_POST_SUCCESS, ADD_POST, ADD_POST_ERROR } from "./constants";

// The initial state of the App
const initialState = fromJS({
    posts: []
});

function addPostReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return state
        .set("loading", true)
        .set("error", false)
        .setIn(["posts"], []);
    case ADD_POST_SUCCESS:
      return state
        .updateIn(["posts"], arr => arr.concat([action.post]))
        .set("loading", false)
        .set("currentUser", action.username);
    case ADD_POST_ERROR:
      return state.set("error", action.error).set("loading", false);
    default:
      return state;
  }
}

export default addPostReducer;
