import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectReducer } from 'utils/injectReducer';
import { injectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectUserPosts } from './selectors';
import { getUserPosts } from './actions';
import reducer from './reducer';
import saga from './saga';
import UserProfilePage from './UserProfilePage';

const mapDispatchToProps = dispatch => ({
  getUserPosts: userId => dispatch(getUserPosts(userId)),
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  userPosts: makeSelectUserPosts(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userPosts', reducer });
const withSaga = injectSaga({ key: 'userPosts', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(UserProfilePage);
export { mapDispatchToProps };
