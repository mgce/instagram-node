import { createSelector } from 'reselect';

const selectPostFeed = (state) => state.get('postFeed');

const makeSelectPosts = () => createSelector(
  selectPostFeed,
  (postFeedState) => postFeedState.get('posts')
)

export {
  selectPostFeed,
  makeSelectPosts
};
