import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Coupon } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/coupons/availability/';

type CouponSlice = {
  list: Coupon;
  loading: boolean;
};

const initialState: CouponSlice = {
  list: {} as Coupon,
  loading: false,
};

const slice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    couponRequested: (state) => {
      state.loading = true;
    },

    couponReceived: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
      state.loading = false;
    },

    couponFailed: (state) => {
      state.loading = false;
    },

    couponRehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateCoupon = (payload: Coupon) => {
  return {
    type: slice.actions.couponRehydrated.type,
    payload,
  };
};

export const loadCoupon = (code: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + code,
      onStart: slice.actions.couponRequested.type,
      onSuccess: slice.actions.couponReceived.type,
      onError: slice.actions.couponFailed.type,
    })
  );
};

//  export reducer function
export const couponReducer = slice.reducer;

// Action Creators
