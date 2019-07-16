import { registerUser } from 'containers/App/actions';
import { injectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { injectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RegisterPage from './RegisterPage';

const mapDispatchToProps = dispatch => ({
  registerUser: form => {
    dispatch(registerUser(form));
  },
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
    withReducer,
    withConnect,
    withSaga,
  )(RegisterPage);

export { mapDispatchToProps };
