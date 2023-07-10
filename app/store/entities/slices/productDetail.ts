import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { ProductData } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type ProductDetailSlice = {
  list: ProductData;
  loading: boolean;
};

const URL = '/products/';

const initialState: ProductDetailSlice = {
  list: {} as ProductData,
  loading: false,
};

const slice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    productRequested: (state) => {
      state.loading = true;
    },

    productReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    productFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateProductData = (payload: ProductData) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadProductData = (id: number) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + id,
      onStart: slice.actions.productRequested.type,
      onSuccess: slice.actions.productReceived.type,
      onError: slice.actions.productFailed.type,
    })
  );
};

export const productDataReducer = slice.reducer;
