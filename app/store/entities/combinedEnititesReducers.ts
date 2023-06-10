import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { persistReducer } from 'redux-persist';
import { localStorage } from './presistStorage';
const authConfig = {
  key: 'auth',
  storage:localStorage, 
};
export const entitiesReducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});
