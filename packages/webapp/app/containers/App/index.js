import { logoutUser, getCurrentUser } from 'containers/App/actions';
import { injectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { injectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import App from './App';
import { withRouter } from 'react-router-dom';
import { makeSelectCurrentUser } from './selectors';
const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser());
  },
  getCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(App),
);
export { mapDispatchToProps };
