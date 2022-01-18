import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SHOW_ERROR,
  UI_RESET_ERROR,
  ADS_LOADED_SUCCESS,
} from './types';

import { getSingle } from './selectors';

// LOGIN AND LOGOUT ACTIONS
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

export function showError(error) {
  return {
    type: UI_SHOW_ERROR,
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
      dispatch(showError(error));
    }
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

// ADVERTS ACTIONS
export function loadAllAdverts() {
  return async function (dispatch, getState, { api, history }) {
    try {
      const ads = await api.adverts.getLastestAdverts();
      dispatch(adsLoaded(ads));
      console.log('ads loaded: ', ads);
    } catch (error) {
      dispatch(showError(error));
    }
  };
}

export function loadSingle(id) {
  return async function (dispatch, getState, { api, history }) {
    try {
      let ad = getSingle(getState(), id);
      if (ad) {
        return;
      } else {
        ad = await api.adverts.getSingleAdvert(id);
        dispatch(adsLoaded(ad));
      }
    } catch (error) {
      dispatch(showError(error));
    }
  };
}

export function adsLoaded(ads) {
  return {
    type: ADS_LOADED_SUCCESS,
    payload: ads,
  };
}

// USER INTERFACE ACTIONS
export function iuResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
