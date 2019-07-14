import { addPost } from 'containers/PostFeedPage/actions';
import { injectReducer } from 'utils/injectReducer';
import reducer from 'containers/PostFeedPage/reducer';
import { injectSaga } from 'utils/injectSaga';
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AddPostPage from './AddPostPage';

const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (form) => {
        dispatch(addPost(form));
    }
})

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'userProfile', reducer})
const withSaga = injectSaga({key: 'addPost', saga});

export default compose(withReducer, withSaga, withConnect)(AddPostPage);
export { mapDispatchToProps };