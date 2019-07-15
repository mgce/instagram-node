import { loginUser } from 'containers/App/actions';
import { injectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { injectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
    lognUser: (form) => {
        dispatch(loginUser(form));
    }
})

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'app', reducer})
const withSaga = injectSaga({key: 'app', saga});

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps }; 