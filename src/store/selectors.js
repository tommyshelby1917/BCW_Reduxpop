export const getIsLogged = (state) => state.auth;

export const getUi = (state) => state.ui;
export const getAds = (state) => state.ads.data;

export const getSingle = (state, id) => state.ads.data.find((e) => e.id === id);
export const serveSingle = (state) => state.single.data;
export const errorSingle = (state) => state.single.error;
