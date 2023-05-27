import { Provider, useDispatch, useSelector, useStore } from 'react-redux';
import { store } from './configureStore';

function StoreProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

function useAppStore() {
  return useStore<RootState>();
}

function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export { StoreProvider, useDispatch, useSelector, store, useStore, useAppStore, useAppDispatch };
export type { RootState, AppDispatch };
