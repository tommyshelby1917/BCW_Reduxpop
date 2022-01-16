import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from './types';

// AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
// AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
// AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
// AUTH_LOGOUT = 'AUTH_LOGOUT';

export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function authLoginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
}

export function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
}

export function authLogin(credentials) {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function iuResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
