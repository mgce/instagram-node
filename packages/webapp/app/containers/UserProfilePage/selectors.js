import { createSelector } from 'reselect';

const selectUserProfile = (state) => state.get('userProfile');

const makeSelectUserPosts = () => createSelector(
  selectUserProfile,
  (userPostsState) => userPostsState.get('posts')
)

const makeSelectUserInfo = () => createSelector(
  selectUserProfile,
  (userPostsState) => userPostsState.get('users')
)

export {
  makeSelectUserPosts,
  makeSelectUserInfo
};
