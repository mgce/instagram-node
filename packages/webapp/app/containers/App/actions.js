import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR
} from './constants';

export function loginUser(credentials){
  return{
      type: LOGIN_USER,
      payload: {
        credentials
      }
  }
}

export function userLoggedIn(user){
  return{
      type: LOGIN_USER_SUCCESS,
      payload: {
        user
      }
  }
}

export function loginUserError(err){
  return{
      type: LOGIN_USER_ERROR,
      err
  }
}

export function logoutUser(){
  return{
      type: LOGOUT_USER,
      payload: {}
  }
}

export function userLogout(){
  return{
      type: LOGOUT_USER_SUCCESS,
      payload:{}
  }
}

export function logoutUserError(err){
  return{
      type: LOGOUT_USER_ERROR,
      err
  }
}