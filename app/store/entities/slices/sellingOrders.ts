import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { SellingOrders } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const OrderSellingAsksURL = '/asks/me';
const OrderSellingListingsURL = '/listings/me';
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
    sellingAsks: {
      asks: [],
      askStats: { active_asks: '', gross_value: 0, net_value: 0, no_of_listing: '' },
    },
    sellingListings: {
      listings: [],
      listingStats: { active_listings: '', gross_value: 0, no_of_listing: 0, total_listings: '' },
    },
  },
  loading: false,
};

const slice = createSlice({
  name: 'SellingOrders',
  initialState,
  reducers: {
    // Reducers for /asks/me
    orderSellingAsksRequested: (state) => {
      state.loading = true;
    },
    orderSellingAsksReceived: (state, action) => {
      state.list.sellingAsks.asks = action.payload.asks;
      state.list.sellingAsks.askStats = action.payload.askStats;
      state.loading = false;
    },
    orderSellingAsksFailed: (state) => {
      state.loading = false;
    },

    // Reducers for /listings/me
    orderSellingListingsRequested: (state) => {
      state.loading = true;
    },
    orderSellingListingsReceived: (state, action) => {
      state.list.sellingListings.listings = action.payload.listings;
      state.list.sellingListings.listingStats = action.payload.stats;
      state.loading = false;
    },
    orderSellingListingsFailed: (state) => {
      state.loading = false;
    },

    orderSellingActiveRequested: (state) => {
      state.loading = true;
    },

    orderSellingActiveReceived: (state, action) => {
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
      // state.list.sellingPendingOrders = action.payload.sellingPendingOrders;
      // state.list.sellingActiveOrders = action.payload.sellingActiveOrders;
      // state.list.sellingCompletedOrders = action.payload.sellingCompletedOrders;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const loadOrderSellingAsks = (date?: string) => async (dispatch: AppDispatch) => {
  const url = date ? `${OrderSellingAsksURL}?created_on=${date}` : OrderSellingAsksURL;
  return await dispatch(
    apiRequest({
      url: url,
      onStart: slice.actions.orderSellingAsksRequested.type,
      onSuccess: slice.actions.orderSellingAsksReceived.type,
      onError: slice.actions.orderSellingAsksFailed.type,
    })
  );
};

// For /listings/me
export const loadOrderSellingListings = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: OrderSellingListingsURL,
      onStart: slice.actions.orderSellingListingsRequested.type,
      onSuccess: slice.actions.orderSellingListingsReceived.type,
      onError: slice.actions.orderSellingListingsFailed.type,
    })
  );
};

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
