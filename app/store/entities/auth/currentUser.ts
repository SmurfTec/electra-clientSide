import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch, store } from '@elektra/store/storeContext';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


const URL = 'auth'

type User = {
  [x:string]: string
};

type LoginBody = {
  email: string;
  password: string;
}

type signupBody ={
  firstname: string,
  lastname: string,
} & LoginBody

export type AuthSession = {
  user: User | null;
  loading:boolean;
  isAuthenticated: boolean;
};

const initialState: AuthSession = {
  user: null,
  loading:false,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSignupRequested: (authSession)=>{
      console.log('hey')
      authSession.loading=true
      console.log(authSession)
    },
    login: (authSession, action: PayloadAction<AuthSession>) => {
      authSession.isAuthenticated = true;
      authSession.user = action.payload.user;
    },
    logout: (authSession) => {
      authSession.user = null;
      authSession.isAuthenticated = false;
    },
    loginSignupSuccess: (authSession)=>{
      authSession.loading=false
    },
    loginSignupFailed: (authSession)=>{
      authSession.loading=false
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

export const loginAsync = (loginBody: LoginBody) => async (dispatch: AppDispatch, getState: typeof store.getState) => {
  return await dispatch(
    apiRequest({
      url: URL+'/login',
      data:loginBody,
      method: 'POST',
       onStart: slice.actions.loginSignupRequested.type,
      // onSuccess: slice.actions.login.type,
      // onError: slice.actions.loginSignupFailed.type,
    })
  );
};
export const signupAsync = (signupBody: signupBody) => async (dispatch: AppDispatch, getState: typeof store.getState) => {
  return await dispatch(
    apiRequest({
      url: URL + '/signup',
      data:signupBody,
      method: 'POST',
      onStart:slice.actions.loginSignupRequested.type,
      onError:slice.actions.loginSignupFailed.type,
    })
  );
};
