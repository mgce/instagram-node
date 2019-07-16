import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './constants';
import {
  userLoggedIn,
  loginUserError,
  userLogout,
  logoutUserError,
  userRegistered,
  registerUserError
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
    const request = yield call(request, {
      method: 'POST',
      url: 'users',
      data: payload.credentials,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    yield put(userRegistered());
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

export default function* userData() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
  yield takeLatest(REGISTER_USER, registerUser);
}
