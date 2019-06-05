import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('posts');

const makeSelectPost = () => createSelector(
  selectGlobal,
  (homeState) => homeState.get('posts')
)

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectPost
};
