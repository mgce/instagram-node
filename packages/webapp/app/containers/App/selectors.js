/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectApp,
  (globalState) => globalState.get('user')
);

const makeSelectLoading = () => createSelector(
  selectApp,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectApp,
  (globalState) => globalState.get('error')
);

const makeSelectPost = () => createSelector(
  selectApp,
  (homeState) => homeState.get('posts')
)

export {
  selectApp as selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectPost
};
