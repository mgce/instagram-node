import { loginUser } from 'containers/App/actions';
import { injectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { injectSaga } from 'utils/injectSaga';
import saga from './saga';
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

const withReducer = injectReducer({key: 'login', reducer})
const withSaga = injectSaga({key: 'login', saga});

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps }; 