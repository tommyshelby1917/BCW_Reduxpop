export const getIsLogged = (state) => state.auth;

export const getUi = (state) => state.ui;

export const getAds = (state) => state.ads.data;

export const getSingle = (state, id) => state.ads.data.find((e) => e.id === id);
