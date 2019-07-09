import { createSelector } from 'reselect';

const selectUserPosts = (state) => state.get('userPosts');

const makeSelectUserPosts = () => createSelector(
  selectUserPosts,
  (userPostsState) => userPostsState.get('posts')
)

export {
  makeSelectUserPosts,
};
