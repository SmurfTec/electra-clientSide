import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { GenericCategoryResponse } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/genericcategories';

type categorySlice = {
  list: GenericCategoryResponse;
  loading: boolean;
};

const initialState: categorySlice = {
  list: {} as GenericCategoryResponse,
  loading: false,
};

const slice = createSlice({
  name: 'genericcategories',
  initialState,
  reducers: {
    categoryRequested: (state) => {
      state.loading = true;
    },

    categoryReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    singleCategoryReceived: (state, action) => {
      const index = state.list.categories.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list.categories.push(action.payload);
      } else {
        state.list.categories[index] = action.payload;
      }
      state.loading = false;
    },

    categoryFailed: (state) => {
      state.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateGenericCategory = (payload: GenericCategoryResponse) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadGenericCategory = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.categoryRequested.type,
      onSuccess: slice.actions.categoryReceived.type,
      onError: slice.actions.categoryFailed.type,
    })
  );
};

export const fetchSingleGenericCategory = (id: string) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + `/${id}`,
      onStart: slice.actions.categoryRequested.type,
      onSuccess: slice.actions.singleCategoryReceived.type,
      onError: slice.actions.categoryFailed.type,
    })
  );
};

//  export reducer function
export const genericCategoryReducer = slice.reducer;

// Action Creators
