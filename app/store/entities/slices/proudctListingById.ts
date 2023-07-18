import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { ProductData, SingleProductListing } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type ProductListingByIdSlice = {
  list: SingleProductListing;
  loading: boolean;
};

const URL = '/listings/';

const initialState: ProductListingByIdSlice = {
  list: {} as SingleProductListing,
  loading: false,
};

const slice = createSlice({
  name: 'single-product-listing',
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

export const rehydrateProductListingById = (payload: ProductData) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadProductListingById = (id: number) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + id,
      onStart: slice.actions.productRequested.type,
      onSuccess: slice.actions.productReceived.type,
      onError: slice.actions.productFailed.type,
    })
  );
};

export const productLisingByIdReducer = slice.reducer;
