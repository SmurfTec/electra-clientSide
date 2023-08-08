import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { BrandsResponse } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/Brands';


type brandSlice = {
  list: BrandsResponse;
  loading: boolean;
};

const initialState: brandSlice = {
  list: {} as BrandsResponse,
  loading: false,
};

const slice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    brandRequested: (state) => {
      state.loading = true;
    },

    brandReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    brandFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateBrand = (payload: BrandsResponse) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadBrand = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.brandRequested.type,
      onSuccess: slice.actions.brandReceived.type,
      onError: slice.actions.brandFailed.type,
    })
  );
};

//  export reducer function
export const brandReducer = slice.reducer;

// Action Creators
