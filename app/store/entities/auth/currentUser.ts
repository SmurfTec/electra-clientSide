import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type User = {
  name: string;
};

export type AuthSession = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthSession = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (authSession, action: PayloadAction<AuthSession>) => {
      if (authSession.isAuthenticated === action.payload.isAuthenticated) return;
      authSession.isAuthenticated = action.payload.isAuthenticated;
      authSession.user = action.payload.user;
    },

    logout: (authSession) => {
      authSession.user = null;
      authSession.isAuthenticated = false;
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

export const logout = () => {
  return {
    type: slice.actions.logout.type,
  };
};
