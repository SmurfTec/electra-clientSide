import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { authReducer } from './auth';
import { entitiesReducers } from './combinedEnititesReducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({
  entities: entitiesReducers,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
export { persistedReducer, rootReducers };
