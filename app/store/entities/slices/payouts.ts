import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';

import { Payouts } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/transactions/me';

type CouponSlice = {
  list: Payouts[];
  loading: boolean;
};

const initialState: CouponSlice = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'payouts',
  initialState,
  reducers: {
    payoutsRequested: (state) => {
      state.loading = true;
    },

    payoutsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    payoutsFailed: (state) => {
      state.loading = false;
    },

    payoutsRehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydratePayouts = (payload: Payouts[]) => {
  return {
    type: slice.actions.payoutsRehydrated.type,
    payload,
  };
};

export const loadPayouts = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.payoutsRequested.type,
      onSuccess: slice.actions.payoutsReceived.type,
      onError: slice.actions.payoutsFailed.type,
    })
  );
};

export const loadPayoutSearch = (search: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + `?firstname=%${search}%&limit=10&page=1`,
      onStart: slice.actions.payoutsRequested.type,
      onSuccess: slice.actions.payoutsReceived.type,
      onError: slice.actions.payoutsFailed.type,
    })
  );
};

//  export reducer function
export const payoutsReducer = slice.reducer;

// Action Creators
