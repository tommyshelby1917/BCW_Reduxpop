import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  UI_SHOW_ERROR,
  ADS_LOADED_SUCCESS,
  SINGLE_LOADED_SUCCESS,
  DELETE_SINGLE,
  COLLECTED_TAGS,
} from './types';

export const defaultState = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
    tags: [],
  },
  single: {
    loaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(authState = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}

export function ads(adsState = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case COLLECTED_TAGS:
      return { ...adsState, tags: action.payload };
    default:
      return adsState;
  }
}

export function single(singleState = defaultState.single, action) {
  switch (action.type) {
    case SINGLE_LOADED_SUCCESS:
      return {
        ...singleState,
        loaded: true,
        data: action.payload,
      };
    case DELETE_SINGLE:
      return singleState;
    default:
      return singleState;
  }
}

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case UI_SHOW_ERROR:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
