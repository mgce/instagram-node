import { fromJS } from "immutable";

import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./constants";

const initialState = fromJS({
  user: {}
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return state
        .set("loading", true)
        .set("error", false)
    case LOGIN_USER_SUCCESS:
      return state
        .setIn(["user"], action.user)
        .set("loading", false)
    case LOGIN_USER_ERROR:
      return state.set("error", action.error).set("loading", false);
    default:
      return state;
  }
}

export default userReducer;
