import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './entities';
import { apiMiddleWare } from './middleware';

function initStore() {
  return configureStore({
    devTools: process.env.NODE_ENV === 'development' ? true : false,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat([apiMiddleWare]),
  });
}
const store = initStore();
const persistor = persistStore(store);

export { persistor, store };
