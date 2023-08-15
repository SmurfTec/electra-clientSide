import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Product } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const trendingURL = '/products/trending';
const latestURL = '/products/?sort=-created_on';
const mostSoldURL = '/products/sold';
const recommendedURL = '/products/recommended';
const shopProducts = '/products/';
const URL = '/products';

type ProductData = {
  mostSold: Product;
  trending: Product;
  latest: Product;
  showMore?: Product;
  recommended?: Product;
  shopProducts?: Product;
};

type specialProduct = {
  list: ProductData;
  loading: boolean;
};

const initialState: specialProduct = {
  list: { mostSold: {products: []}, trending: {products: []}, latest: {products: []}, showMore: {products: []}, recommended: {products: []}, shopProducts: {products: []} },
  loading: false,
};

const slice = createSlice({
  name: 'specialProducts',
  initialState,
  reducers: {
    specialProductRequested: (state) => {
      state.loading = true;
    },

    trendingReceived: (state, action) => {
      state.list.trending = action.payload;
      state.loading = false;
    },

    mostSoldReceived: (state, action) => {
      state.list.mostSold = action.payload;
      state.loading = false;
    },
    latestReceived: (state, action) => {
      state.list.latest = action.payload;
      state.loading = false;
    },

    showMoreReceived: (state, action) => {
      state.list.showMore = action.payload;
      state.loading = false;
    },

    shopProductsReceived: (state, action) => {
      state.list.shopProducts = action.payload;
      state.loading = false;
    },

    recommendedReceived: (state, action) => {
      state.list.recommended = action.payload;
      state.loading = false;
    },

    rehydrateSpecialProduct: (state, action) => {
      state.loading = true;
      (state.list.latest = action.payload.latest), (state.list.mostSold = action.payload.mostSold);
      state.list.trending = action.payload.trending;

      state.list.shopProducts = action.payload.shopProducts ?? [];
      state.loading = false;
    },

    rehydrateShopProduct: (state, action) => {
      state.loading = true;
      state.list.shopProducts = action.payload
      state.loading = false;
    },

    specialProductFailed: (state) => {
      state.loading = false;
    },
  },
});

export const rehydrateSpecialProducts = (payload: ProductData) => {
  return {
    type: slice.actions.rehydrateSpecialProduct.type,
    payload,
  };
};

export const rehydrateShopProducts = (payload: Product) => {
  return {
    type: slice.actions.rehydrateShopProduct.type,
    payload,
  };
};

export const loadTrendingProducts = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: trendingURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.trendingReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const fetchShowMoreProducts = (param: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + `?title=%${param}%`,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.showMoreReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const loadRecommendedProducts = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: recommendedURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.recommendedReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const fetchShopProducts =
  (param: string = '') =>
  async (dispatch: AppDispatch) => {
    console.log(URL + `${param}`);
    return await dispatch(
      apiRequest({
        url: URL + `${param}`,
        onStart: slice.actions.specialProductRequested.type,
        onSuccess: slice.actions.shopProductsReceived.type,
        onError: slice.actions.specialProductFailed.type,
      })
    );
  };
  export const loadFilterProducts =
  (params: string = '&limit=15&page=1') =>
  async (dispatch: AppDispatch) => {
    return await dispatch(
      apiRequest({
        url:URL + `?${params}`,
        onStart: slice.actions.specialProductRequested.type,
        onSuccess: slice.actions.shopProductsReceived.type,
        onError: slice.actions.specialProductFailed.type,
      })
    );
  };

export const loadLatestProducts = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: latestURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.latestReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const loadMostSoldProducts = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: mostSoldURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.mostSoldReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

//  export reducer function
export const specialProductReducer = slice.reducer;

// Action Creators
