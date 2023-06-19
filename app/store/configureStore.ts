import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { persistedReducer } from './entities';
import { apiMiddleWare } from './middleware';

const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

function initStore() {
  return configureStore({
    devTools: process.env.NODE_ENV === 'development' ? true : false,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck }).concat([apiMiddleWare]),
  });
}
const store = initStore();
const persistor = persistStore(store);

export { persistor, store,initStore };
