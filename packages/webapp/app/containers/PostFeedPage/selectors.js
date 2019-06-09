import { createSelector } from 'reselect';

const selectPostFeed = (state) => state.get('postFeed');

const makeSelectPosts = () => createSelector(
  selectPostFeed,
  (homeState) => homeState.get('posts')
)

export {
  selectPostFeed,
  makeSelectPosts
};
