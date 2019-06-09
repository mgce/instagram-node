import { call, put, select, takeLatest } from "redux-saga/effects";
import { LOGIN_USER } from "containers/App/constants";
import { userLoggedIn, loginUserError } from "containers/App/actions";
import { authenticator } from "utils/authenticator";
import { history } from "utils/history";

var jwtDecode = require("jwt-decode");
import request from "utils/request";

export function* loginUser(data) {
  try {
    const response = yield call(request, {
      method: "POST",
      url:"token",
      data: JSON.stringify(data.credentials),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    authenticator.setTokens(response.data.token, response.data.refreshToken);
    const claims = jwtDecode(response.data.token);
    delete claims.iss;
    delete claims.exp;
    yield put(userLoggedIn(claims));
    history.push('')
  } catch (err) {
    console.log(err);
    yield put(loginUserError(err));
  }
}

export default function* userData() {
  yield takeLatest(LOGIN_USER, loginUser);
}
