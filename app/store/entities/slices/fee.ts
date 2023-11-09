import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';

import { createSlice } from '@reduxjs/toolkit';
import { FeeData } from '@elektra/types';

const URL = '/fees/category/';

type CouponSlice = {
  list: FeeData;
  loading: boolean;
};

const initialState: CouponSlice = {
  list: {} as FeeData,
  loading: false,
};

const slice = createSlice({
  name: 'fee',
  initialState,
  reducers: {
    feeRequested: (state) => {
      state.loading = true;
    },

    feeReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    feeFailed: (state) => {
      state.loading = false;
    },

    feeRehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateFees = (payload: FeeData) => {
  return {
    type: slice.actions.feeRehydrated.type,
    payload,
  };
};

export const loadFee = (categoryId: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + categoryId,
      onStart: slice.actions.feeRequested.type,
      onSuccess: slice.actions.feeReceived.type,
      onError: slice.actions.feeFailed.type,
    })
  );
};

//  export reducer function
export const feeReducer = slice.reducer;

// Action Creators
