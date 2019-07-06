import { createSelector } from 'reselect';

const selectTagFeed = state => state.get('tagsFeed');

const makeSelectTags = () => createSelector(
  selectTagFeed,
  tagFeedState => tagFeedState.get('postsByTags')
);

export {
  selectTagFeed,
  makeSelectTags
};