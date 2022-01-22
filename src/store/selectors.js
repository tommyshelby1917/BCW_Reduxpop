export const getIsLogged = (state) => state.auth;

export const getUi = (state) => state.ui;

export const getAds = (state) => state.ads.data;

export const getSingle = (state, id) => state.ads.data.find((e) => e.id === id);
export const serveSingle = (state) => state.single.data;

export const getTags = (state) => state.ads.tags;

export const getErrors = (state) => state.ui.error;
export const getIsLoading = (state) => state.ui.isLoading;
