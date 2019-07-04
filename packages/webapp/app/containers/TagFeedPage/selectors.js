import { createSelector } from 'reselect';

const selectTagFeed = state => state.get('tags');

const makeSelectTags = () => createSelector(
  selectTagFeed,
  tagFeedState => tagFeedState.get('tags')
);

export {
  selectTagFeed,
  makeSelectTags
};