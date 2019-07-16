/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return state.set('loading', true).set('error', false);
    case LOGIN_USER_SUCCESS:
      return state.setIn(['user'], action.payload.user).set('loading', false);
    case LOGIN_USER_ERROR:
      return state.set('error', action.error).set('loading', false);
    case REGISTER_USER:
      return state.set('loading', true).set('error', false);
    case REGISTER_USER_SUCCESS:
      return state.setIn(['user'], action.payload.user).set('loading', false);
    case REGISTER_USER_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOGOUT_USER:
      return state.set('loading', true).set('error', false);
    case LOGOUT_USER_SUCCESS:
      return state.setIn(['user'], {}).set('loading', false);
    case LOGOUT_USER_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
