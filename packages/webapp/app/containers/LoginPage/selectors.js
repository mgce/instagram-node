/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectLogin = state => state.get("login");

const makeSelectUser = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get("user")
  );

export { selectLogin, makeSelectUser };
