import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectReducer } from 'utils/injectReducer';
import { injectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectTags } from './selectors';
import { loadTag } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectComments } from '../PostFeedPage/selectors';
import { loadComments, addComment } from '../PostFeedPage/actions';
import TagFeedPage from './TagFeedPage';

const mapDispatchToProps = (dispatch) => ({
  loadTag: (tagName) => dispatch(loadTag(tagName)),
  loadComments: (postId) => dispatch(loadComments(postId)),
  addComment: (comment) => dispatch(addComment(comment))
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  tags: makeSelectTags(),
  comments: makeSelectComments(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'tagsFeed', reducer });
const withSaga = injectSaga({ key: 'tagsFeed', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga
)(TagFeedPage);
export { mapDispatchToProps };
