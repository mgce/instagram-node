import { call, put, select, takeLatest } from "redux-saga/effects";
import { LOGIN_USER } from "./constants";
import { userLoggedIn, loginUserError } from "./actions";
import {authenticator} from 'utils/authenticator'

var jwtDecode = require('jwt-decode');
import request from "utils/request";

export function* loginUser(data) {
  const requestURL = `http://localhost:5000/`;

  try {
    const response = yield call(request, requestURL + "token", {
      method: "POST",
      body: JSON.stringify(data.credentials),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    authenticator.setTokens(response.data.token, response.data.refreshToken)
    const claims = jwtDecode(response.data.token);
    yield put(userLoggedIn({userId:claims.userid}));
  } catch (err) {
      console.log(err);
    yield put(loginUserError(err));
  }
}


export default function* userData() {
    yield takeLatest(LOGIN_USER, loginUser);
  }
  