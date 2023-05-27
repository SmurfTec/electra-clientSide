import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './entities';
import { apiMiddleWare } from './middleware';

function initStore() {
  return configureStore({
    devTools: process.env.NODE_ENV === 'development' ? true : false,
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiMiddleWare]),
  });
}

export const store = initStore();
