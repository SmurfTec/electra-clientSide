import { ReactNode } from 'react';
import { Provider, useDispatch, useSelector, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './configureStore';

type StoreProviderProps = {
  children: ReactNode;
  LoadingOverlay?: ReactNode;
};

function StoreProvider({ children, LoadingOverlay }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={LoadingOverlay ?? <>loading</>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

function useAppStore() {
  return useStore<RootState>();
}

function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export { StoreProvider, store, useAppDispatch, useAppStore, useDispatch, useSelector, useStore };
export type { AppDispatch, RootState };
