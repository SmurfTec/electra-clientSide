import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { ListingsResponse, ProductVariant } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type ProductVariantSlice = {
  list: ProductVariant;
  loading: boolean;
};

const URL = '/variants';

const initialState: ProductVariantSlice = {
  list: {} as ProductVariant,
  loading: false,
};

const slice = createSlice({
  name: 'productVariant',
  initialState,
  reducers: {
    variantRequested: (state) => {
      state.loading = true;
    },

    productVariantReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    variantFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateProductVariants = (payload: ProductVariant) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadProductVariants = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.variantRequested.type,
      onSuccess: slice.actions.productVariantReceived.type,
      onError: slice.actions.variantFailed.type,
    })
  );
};

export const productVariantReducer = slice.reducer;
