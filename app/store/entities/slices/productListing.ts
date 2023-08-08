import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { ListingsResponse } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type ListingProductSlice = {
  list: ListingsResponse;
  loading: boolean;
};

const listingUrl = '/listings/';

const initialState: ListingProductSlice = {
  list: {} as ListingsResponse,
  loading: false,
};

const slice = createSlice({
  name: 'productListing',
  initialState,
  reducers: {
    productRequested: (state) => {
      state.loading = true;
    },

    listingProductReceived: (state, action) => {
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

export const rehydrateListingProductData = (payload: ListingsResponse) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadListingProducts =
  (id: number, params: string = '&limit=15&page=1') =>
  async (dispatch: AppDispatch) => {
    return await dispatch(
      apiRequest({
        url: listingUrl + `?product_data=${id}${params}`,
        onStart: slice.actions.productRequested.type,
        onSuccess: slice.actions.listingProductReceived.type,
        onError: slice.actions.productFailed.type,
      })
    );
  };

export const productListingReducer = slice.reducer;
