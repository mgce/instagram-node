import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, GET_CURRENT_USER_INFO } from './constants';
import {
  userLoggedIn,
  loginUserError,
  userLogout,
  logoutUserError,
  userRegistered,
  registerUserError,
  currentUserGet,
  getCurrentUserError
} from './actions';
import { authenticator } from 'utils/authenticator';
import { history } from 'utils/history';

var jwtDecode = require('jwt-decode');
import request from 'utils/request';

export function* loginUser({ payload }) {
  try {
    const response = yield call(request, {
      method: 'POST',
      url: 'tokens',
      data: JSON.stringify(payload.credentials),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    authenticator.setTokens(response.data.token, response.data.refreshToken);
    const claims = jwtDecode(response.data.token);
    delete claims.iss;
    delete claims.exp;
    yield put(userLoggedIn(claims));
    yield history.push('');
  } catch (err) {
    console.log(err);
    yield put(loginUserError(err));
  }
}

export function* registerUser({payload}) {
  try {
    const response = yield call(request, {
      method: 'POST',
      url: 'users',
      data: payload.credentials,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    //return user data from server and then login
    yield put(userRegistered());
    yield loginUser({payload:{
      credentials:{
        emailAddress:payload.credentials.emailAddress,
        password:payload.credentials.password
      }
    }});
  } catch (err) {
    yield put(registerUserError(err));
  }
}

export function* logoutUser() {
  try {
    yield call(request, {
      method: 'POST',
      url: 'tokens/logout',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    authenticator.removeTokens();
    history.push('');
    yield put(userLogout());
  } catch (err) {
    yield put(logoutUserError(err));
  }
}

export function* getCurrentUser({ payload }) {
  try {
    const response = yield call(request, {
      method: 'POST',
      url: 'tokens',
      data: JSON.stringify(payload.credentials),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(currentUserGet(claims));
  } catch (err) {
    yield put(getCurrentUserError(err));
  }
}

export default function* userData() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
  yield takeLatest(REGISTER_USER, registerUser);
  yield takeLatest(GET_CURRENT_USER_INFO, getCurrentUser);
}
