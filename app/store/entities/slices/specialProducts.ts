import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Product } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const trendingURL = '/products/?sort=-clicks,interactions&page=1&limit=5';
const latestURL = '/products/?sort=-created_on';
const mostSoldURL = '/products/?sort=-sold';
const URL = '/products';

type ProductData = {
  mostSold: Product[];
  trending: Product[];
  latest: Product[];
  showMore: Product[];
};

type specialProduct = {
  list: { mostSold: Product[]; trending: Product[]; latest: Product[]; showMore: Product[] };
  loading: boolean;
};

const initialState: specialProduct = {
  list: { mostSold: [], trending: [], latest: [], showMore: [] },
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
      state.list.trending = action.payload.products;
      state.loading = false;
    },

    mostSoldReceived: (state, action) => {
      state.list.mostSold = action.payload.products;
      state.loading = false;
    },
    latestReceived: (state, action) => {
      state.list.latest = action.payload.products;
      state.loading = false;
    },

    showMoreReceived: (state, action) => {
      state.list.showMore = action.payload.products;
      state.loading = false;
    },

    rehydrateSpecialProduct: (state, action) => {
      state.loading = true;
      (state.list.latest = action.payload.latest), (state.list.mostSold = action.payload.mostSold);
      state.list.trending = action.payload.trending;
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
