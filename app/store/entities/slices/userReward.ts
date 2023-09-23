import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { createSlice } from '@reduxjs/toolkit';
import { UserReward } from '@elektra/types';

export type userReward = {
  list: UserReward[];
  loading: boolean;
};

const URL = '/rewards';

const initialState: userReward = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'userReward',
  initialState,
  reducers: {
    userRewardRequested: (state) => {
      state.loading = true;
    },

    userRewardReceived: (state, action) => {
      state.list = action.payload['rewards'];
      state.loading = false;
    },

    userRewardFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateUserReward = (payload:UserReward[]) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadUserReward = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest<{rewards:UserReward[]}>({
      url: URL,
      onStart: slice.actions.userRewardRequested.type,
      onSuccess: slice.actions.userRewardReceived.type,
      onError: slice.actions.userRewardFailed.type,
    })
  );
};

//  export reducer function
export const userRewardReducer = slice.reducer;

// Action Creators
