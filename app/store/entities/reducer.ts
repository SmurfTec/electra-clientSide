import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { entitiesReducers } from './combinedEnititesReducers';

const rootReducers = combineReducers({
  entities: entitiesReducers,
  auth: authReducer,
});

export { rootReducers };
