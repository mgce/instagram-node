import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_CURRENT_USER_INFO,
  GET_CURRENT_USER_INFO_SUCCESS,
  GET_CURRENT_USER_INFO_ERROR
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

//register

export function registerUser(credentials){
  return{
      type: REGISTER_USER,
      payload: {
        credentials
      }
  }
}

export function userRegistered(user){
  return{
      type: REGISTER_USER_SUCCESS,
      payload: {
        user
      }
  }
}

export function registerUserError(err){
  return{
      type: REGISTER_USER_ERROR,
      err
  }
}

//logout

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

//current User

export function getCurrentUser(){
  return{
      type: GET_CURRENT_USER_INFO,
      payload: {}
  }
}

export function currentUserGet(user){
  return{
      type: GET_CURRENT_USER_INFO_SUCCESS,
      payload:{user}
  }
}

export function getCurrentUserError(err){
  return{
      type: GET_CURRENT_USER_INFO_ERROR,
      err
  }
}