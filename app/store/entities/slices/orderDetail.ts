import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Order } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/orders/';

type OrdersSlice = {
  list: Order;
  loading: boolean;
};

const initialState: OrdersSlice = {
  list: {},
  loading: false,
};

const slice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    orderDetailRequested: (state) => {
      state.loading = true;
    },

    orderDetailReceived: (state, action) => {
      state.list = action.payload.order;
      state.loading = false;
    },

    orderDetailFailed: (state) => {
      state.loading = false;
    },

    orderDetailRehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateOrderDetail = (payload: Order) => {
  return {
    type: slice.actions.orderDetailRehydrated.type,
    payload,
  };
};

export const loadOrderDetail = (id: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + id,
      onStart: slice.actions.orderDetailRequested.type,
      onSuccess: slice.actions.orderDetailReceived.type,
      onError: slice.actions.orderDetailFailed.type,
    })
  );
};

//  export reducer function
export const orderDetailReducer = slice.reducer;

// Action Creators
