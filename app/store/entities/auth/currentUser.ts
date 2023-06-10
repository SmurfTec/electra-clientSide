import { PayloadAction, createSlice } from '@reduxjs/toolkit';



type User = {
  [x: string]: string | object;
};


export type AuthSession = {
  user: User | null;
  profile:User | null;
  isAuthenticated: boolean;
};

const initialState: AuthSession = {
  user: null,
  profile:null,
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

