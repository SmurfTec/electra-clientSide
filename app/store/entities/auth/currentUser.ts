import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Profile, User } from '@elektra/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AuthSession = {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
};

const initialState: AuthSession = {
  user: null,
  profile: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (authSession, action: PayloadAction<AuthSession>) => {
      authSession.isAuthenticated = action.payload.isAuthenticated;
      authSession.user = action.payload.user;
      authSession.profile = action.payload.profile;
    },
    logout: (authSession) => {
      authSession.user = null;
      authSession.profile = null;
      authSession.isAuthenticated = false;
    },

    updateProfile: (state, action) => {
      state.profile = action.payload.data;
    },
  },
});

//  export reducer function
export const authReducer = slice.reducer;

// Action Creators
export const login = (authSession: AuthSession) => {
  return {
    payload: authSession,
    type: slice.actions.login.type,
  };
};

export const updateUserProfile = (id: number) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: '/profiles/' + id,
      onSuccess: slice.actions.updateProfile.type,
    })
  );
};

export const updateUser = (authSession: AuthSession) => {
  return {
    payload: authSession,
    type: slice.actions.login.type,
  };
};

export const logout = () => {
  return {
    type: slice.actions.logout.type,
  };
};
