import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';

export const entitiesReducers = combineReducers({
  auth: authReducer,
});
