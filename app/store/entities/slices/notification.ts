import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { NotificationResponse } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/notifications/own/all';

type notificationSlice = {
  list: NotificationResponse;
  loading: boolean;
};

const initialState: notificationSlice = {
  list: {} as NotificationResponse,
  loading: false,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationRequested: (state) => {
      state.loading = true;
    },

    notificationReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    notificationFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydratenotification = (payload: NotificationResponse) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadNotifications = (isAuth:boolean=false) => async (dispatch: AppDispatch) => {
  if(isAuth){
    return await dispatch(
      apiRequest({
        url:URL,
        onStart: slice.actions.notificationRequested.type,
        onSuccess: slice.actions.notificationReceived.type,
        onError: slice.actions.notificationFailed.type,
      })
    );
  }{
    return null;
  }
 
};

//  export reducer function
export const notificationReducer = slice.reducer;

// Action Creators
