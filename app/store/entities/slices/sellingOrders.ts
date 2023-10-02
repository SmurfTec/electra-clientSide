import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { SellingOrders } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const OrderSellingActiveURL = '/asks/me';
const OrderSellingCompletedURL = '/orders/me/selling?status=completed';
const OrderSellingPendingURL = '/orders/me/selling?status=pending';

type OrdersSlice = {
  list: SellingOrders;
  loading: boolean;
};

const initialState: OrdersSlice = {
  list: {
    sellingActiveOrders: {
      results: 0,
      asks: [],
      askStats: { active_asks: '', gross_value: 0, net_value: 0, no_of_listing: '' },
    },
    sellingCompletedOrders: {
      orders: [],
      orderStats: [],
      results: 0,
    },
    sellingPendingOrders: {
      orders: [],
      orderStats: [],
      results: 0,
    },
  },
  loading: false,
};

const slice = createSlice({
  name: 'SellingOrders',
  initialState,
  reducers: {
    orderSellingActiveRequested: (state) => {
      state.loading = true;
    },

    orderSellingActiveReceived: (state, action) => {
      console.log(action.payload,"action.payload")
      state.list.sellingActiveOrders = action.payload;
      state.loading = false;
    },

    orderSellingActiveFailed: (state) => {
      state.loading = false;
    },

    orderSellingCompletedRequested: (state) => {
      state.loading = true;
    },

    orderSellingCompletedReceived: (state, action) => {
      state.list.sellingCompletedOrders = action.payload;
      state.loading = false;
    },

    orderSellingCompletedFailed: (state) => {
      state.loading = false;
    },

    orderSellingPendingRequested: (state) => {
      state.loading = true;
    },

    orderSellingPendingReceived: (state, action) => {
      state.list.sellingPendingOrders = action.payload;
      state.loading = false;
    },

    orderSellingPendingFailed: (state) => {
      state.loading = false;
    },

    orderSellingRehydrated: (state, action) => {
      state.loading = true;
      state.list.sellingPendingOrders = action.payload.sellingPendingOrders;
      state.list.sellingActiveOrders = action.payload.sellingActiveOrders;
      state.list.sellingCompletedOrders = action.payload.sellingCompletedOrders;
      state.loading = false;
    },
  },
});

export const rehydrateOrderSelling = (payload: SellingOrders) => {
  return {
    type: slice.actions.orderSellingRehydrated.type,
    payload,
  };
};

export const loadOrderSellingSearch = (search: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: OrderSellingCompletedURL + `?title=%${search}%&limit=10&page=1`,
      onStart: slice.actions.orderSellingCompletedRequested.type,
      onSuccess: slice.actions.orderSellingCompletedReceived.type,
      onError: slice.actions.orderSellingCompletedFailed.type,
    })
  );
};

export const loadOrderSelling = () => async (dispatch: AppDispatch) => {
  const active = dispatch(
    apiRequest({
      url: OrderSellingActiveURL,
      onStart: slice.actions.orderSellingActiveRequested.type,
      onSuccess: slice.actions.orderSellingActiveReceived.type,
      onError: slice.actions.orderSellingActiveFailed.type,
    })
  );
  const pending = dispatch(
    apiRequest({
      url: OrderSellingCompletedURL,
      onStart: slice.actions.orderSellingCompletedRequested.type,
      onSuccess: slice.actions.orderSellingCompletedReceived.type,
      onError: slice.actions.orderSellingCompletedFailed.type,
    })
  );
  const completed = dispatch(
    apiRequest({
      url: OrderSellingPendingURL,
      onStart: slice.actions.orderSellingPendingRequested.type,
      onSuccess: slice.actions.orderSellingPendingReceived.type,
      onError: slice.actions.orderSellingPendingFailed.type,
    })
  );
  await Promise.all([active, pending, completed]);
};

//  export reducer function
export const sellingOrdersReducer = slice.reducer;

// Action Creators
