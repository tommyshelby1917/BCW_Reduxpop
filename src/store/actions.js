import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SHOW_ERROR,
  UI_RESET_ERROR,
  ADS_LOADED_SUCCESS,
  SINGLE_LOADED_SUCCESS,
  SINGLE_LOADED_FAILED,
  DELETE_SINGLE,
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
    dispatch(deleteSingle());
    try {
      let ad = getSingle(getState(), id);
      if (ad) {
        dispatch(singleLoaded(ad));
      } else {
        ad = await api.adverts.getSingleAdvert(id);
        dispatch(singleLoaded(ad));
        console.log('te doy el ad: ', ad);
      }
    } catch (error) {
      dispatch(singleFailed(error));
    }
  };
}

export function adsLoaded(ads) {
  return {
    type: ADS_LOADED_SUCCESS,
    payload: ads,
  };
}

export function singleLoaded(ad) {
  return {
    type: SINGLE_LOADED_SUCCESS,
    payload: ad,
  };
}

export function singleFailed(error) {
  return {
    type: SINGLE_LOADED_FAILED,
    payload: error,
  };
}

export function deleteSingle() {
  return {
    type: DELETE_SINGLE,
  };
}

// USER INTERFACE ACTIONS
export function iuResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
