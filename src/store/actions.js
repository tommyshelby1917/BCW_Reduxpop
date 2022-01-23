import {
  LOADER_REQUEST,
  LOADER_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SHOW_ERROR,
  UI_RESET_ERROR,
  ADS_LOADED_SUCCESS,
  SINGLE_LOADED_SUCCESS,
  COLLECTED_TAGS,
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

export function authLogin(credentials) {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || {
        from: { pathname: '/' },
      };
      history.replace(from);
    } catch (error) {
      dispatch(setError(error));
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
    } catch (error) {
      if (error.status === 401) {
        history.replace('/login');
      }
      dispatch(setError(error));
    }
  };
}

export function filterAdverts(filters) {
  return async function (dispatch, getState, { api, history }) {
    try {
      const adverts = await api.adverts.getFilteredAdverts(filters);
      if (adverts.length > 0) {
        dispatch(adsLoaded(adverts));
        dispatch(iuResetError());
      } else {
        throw new Error('No adverts founded!');
      }
    } catch (err) {
      dispatch(setError(err));
    }
  };
}

export function loadSingle(id) {
  return async function (dispatch, getState, { api, history }) {
    dispatch(enableLoader());
    let ad = getSingle(getState(), id);
    if (ad) {
      dispatch(singleLoaded(ad));
    } else {
      try {
        ad = await api.adverts.getSingleAdvert(id);
        dispatch(singleLoaded(ad));
      } catch (error) {
        if (error.status === 401) {
          history.replace('/login');
        } else {
          history.replace('/404');
        }
      }
    }
    dispatch(disableLoader());
  };
}

export function deleteAdvert(id) {
  return async function (dispatch, getState, { api, history }) {
    try {
      const deleted = await api.adverts.deletePostApi(id);
      history.replace('/');
      console.log('An advert has been deleted: ', deleted);
      dispatch(loadAllAdverts());
    } catch (error) {
      dispatch(setError(error));
    }
  };
}

export function newAdvert(ad) {
  return async function (dispatch, getState, { api, history }) {
    try {
      const newAd = await api.adverts.newPostApi(ad);
      history.replace(`/adverts/${newAd.id}`);
    } catch (error) {
      if (error.status === 401) {
        return history.replace('/login');
      }
      dispatch(setError(error));
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

export function loadAllTags() {
  return async function (dispatch, getState, { api, history }) {
    try {
      const tags = await api.adverts.requestTagsToAPI();
      dispatch(collectedTags(tags));
    } catch (error) {
      dispatch(setError(error));
    }
  };
}

export function collectedTags(tags) {
  return {
    type: COLLECTED_TAGS,
    payload: tags,
  };
}

// USER INTERFACE ACTIONS
export function enableLoader() {
  return {
    type: LOADER_REQUEST,
  };
}

export function disableLoader() {
  return {
    type: LOADER_SUCCESS,
  };
}

export function setError(error) {
  return {
    type: UI_SHOW_ERROR,
    payload: error,
  };
}

export function iuResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
