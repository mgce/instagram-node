import { createSelector } from 'reselect';

const selectPostFeed = (state) => state.get('postFeed');

const makeSelectPosts = () => createSelector(
  selectPostFeed,
  (postFeedState) => postFeedState.get('posts')
);

const makeSelectComments = () => createSelector(
  selectPostFeed,
  (postFeedState) => postFeedState.get('comments')
);

export {
  selectPostFeed,
  makeSelectPosts,
  makeSelectComments
};
