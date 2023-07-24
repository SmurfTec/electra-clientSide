import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { OrderPurchasingActive, OrderPurchasingCompleted, PurchasingOrders } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const OrderPurchasingActiveURL = '/bids/me';
const OrderPurchasingCompletedURL = '/orders/me/purchasing?status=completed';
const OrderPurchasingPendingURL = '/orders/me/purchasing?status=pending';

type OrdersSlice = {
  list: PurchasingOrders
  loading: boolean;
};

const initialState: OrdersSlice = {
  list: {
    purchasingActiveOrders: {
      results: 0,
      bids: [],
      bidStats: { active_bids: '0', total_bids: '0', total_value: 0 },
    },
    purchasingCompletedOrders: {
      orders: [],
      orderStats: [],
      results: 0,
    },
    purchasingPendingOrders: {
      orders: [],
      orderStats: [],
      results: 0,
    },
  },
  loading: false,
};

const slice = createSlice({
  name: 'purchasingOrders',
  initialState,
  reducers: {
    orderPurchasingActiveRequested: (state) => {
      state.loading = true;
    },

    orderPurchasingActiveReceived: (state, action) => {
      state.list.purchasingActiveOrders = action.payload;
      state.loading = false;
    },

    orderPurchasingActiveFailed: (state) => {
      state.loading = false;
    },

    
    orderPurchasingCompletedRequested: (state) => {
      state.loading = true;
    },

    orderPurchasingCompletedReceived: (state, action) => {
      state.list.purchasingCompletedOrders = action.payload;
      state.loading = false;
    },

    orderPurchasingCompletedFailed: (state) => {
      state.loading = false;
    },

    
    orderPurchasingPendingRequested: (state) => {
      state.loading = true;
    },

    orderPurchasingPendingReceived: (state, action) => {
      state.list.purchasingPendingOrders = action.payload;
      state.loading = false;
    },

    orderPurchasingPendingFailed: (state) => {
      state.loading = false;
    },

    orderPurchasingRehydrated: (state, action) => {
      state.loading = true;
      state.list.purchasingActiveOrders = action.payload.purchasingActiveOrders;
      state.list.purchasingPendingOrders = action.payload.purchasingPendingOrders;
      state.list.purchasingCompletedOrders = action.payload.purchasingCompletedOrders;
      state.loading = false;
    },
  },
});

export const rehydrateOrderPurchasing = (payload: PurchasingOrders) => {
  return {
    type: slice.actions.orderPurchasingRehydrated.type,
    payload,
  };
};


export const loadOrderPurchasing = () => async (dispatch: AppDispatch) => {
   const active = dispatch(
    apiRequest({
      url: OrderPurchasingActiveURL,
      onStart: slice.actions.orderPurchasingActiveRequested.type,
      onSuccess: slice.actions.orderPurchasingActiveReceived.type,
      onError: slice.actions.orderPurchasingActiveFailed.type,
    })
  );
  const completed = dispatch(
    apiRequest({
      url: OrderPurchasingCompletedURL,
      onStart: slice.actions.orderPurchasingCompletedRequested.type,
      onSuccess: slice.actions.orderPurchasingCompletedReceived.type,
      onError: slice.actions.orderPurchasingCompletedFailed.type,
    })
  );
  const pending =  dispatch(
    apiRequest({
      url: OrderPurchasingPendingURL,
      onStart: slice.actions.orderPurchasingPendingRequested.type,
      onSuccess: slice.actions.orderPurchasingPendingReceived.type,
      onError: slice.actions.orderPurchasingPendingFailed.type,
    })
  );
  await Promise.all([active,pending,completed])
};


//  export reducer function
export const purchasingOrdersReducer = slice.reducer;

// Action Creators
