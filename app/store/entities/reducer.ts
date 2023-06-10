import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { entitiesReducers } from './combinedEnititesReducers';
import { localStorage } from './presistStorage';
import { persistReducer } from 'redux-persist';

const authConfig = {
  key: 'auth',
  storage:localStorage, 
};

const entitiesConfig = {
  key: 'entities',
  storage:localStorage, 
};

const persistConfig = {
  key: 'root',
  storage: localStorage,
  blacklist: ['entities'],
  debug: false,
};

const rootReducers = combineReducers({
  entities: persistReducer(entitiesConfig, entitiesReducers),
  auth: persistReducer(authConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
export { rootReducers ,persistedReducer};
