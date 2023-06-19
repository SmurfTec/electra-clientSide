import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { ProtectionPlan } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type ProtectionPlanSlice = {
  list: { result: number; protectionplans: ProtectionPlan[] };
  loading: boolean;
};

const URL = '/protectionplans';

const initialState: ProtectionPlanSlice = {
  list: {
    result: 0,
    protectionplans: [],
  },
  loading: false,
};

const slice = createSlice({
  name: 'protectionPlan',
  initialState,
  reducers: {
    planRequested: (fp) => {
      fp.loading = true;
    },

    planReceived: (fp, action) => {
      fp.list = action.payload;
      fp.loading = false;
    },

    planFailed: (fp) => {
      fp.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateProtectionPlan = (payload: ProtectionPlan[]) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadProtectionPlan = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.planRequested.type,
      onSuccess: slice.actions.planReceived.type,
      onError: slice.actions.planFailed.type,
    })
  );
};

export const protectionPlanReducer = slice.reducer;