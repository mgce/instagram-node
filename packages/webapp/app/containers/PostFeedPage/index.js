import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectReducer } from 'utils/injectReducer';
import { injectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import {
  loadPosts, loadComments, likePost, unlikePost
} from './actions';
import { makeSelectPosts, makeSelectComments } from './selectors';
import reducer from './reducer';
import saga from './saga';
import PostFeedPage from './PostFeedPage';

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(loadPosts()),
  loadComments: (postId) => dispatch(loadComments(postId)),
  likePost: (postId) => dispatch(likePost(postId)),
  unlikePost: (postId) => dispatch(unlikePost(postId)),
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  posts: makeSelectPosts(),
  comments: makeSelectComments(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'postFeed', reducer });
const withSaga = injectSaga({ key: 'postFeed', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga
)(PostFeedPage);
export { mapDispatchToProps };
