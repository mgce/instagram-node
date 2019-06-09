import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from './constants';

export function loginUser(credentials){
  return{
      type: LOGIN_USER,
      credentials
  }
}

export function userLoggedIn(user){
  return{
      type: LOGIN_USER_SUCCESS,
      user
  }
}

export function loginUserError(err){
  return{
      type: LOGIN_USER_ERROR,
      err
  }
}