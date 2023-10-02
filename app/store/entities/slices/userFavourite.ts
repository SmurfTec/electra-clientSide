import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { UserFavourite } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const URL = '/favourites?sort=-created_on';

type userFavouriteSlice = {
  list: UserFavourite;
  loading: boolean;
};

const initialState: userFavouriteSlice = {
  list: {
    results: 0,
    favourites: [],
  },
  loading: false,
};

const slice = createSlice({
  name: 'userFavourite',
  initialState,
  reducers: {
    userFavouriteRequested: (state) => {
      state.loading = true;
    },

    userFavouriteReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    userFavouriteFailed: (state) => {
      state.loading = false;
    },

    removeFavaourite: (state, action) => {
      console.log(action.payload);
      const index = state.list.favourites.findIndex((fvt) => fvt.product.id === action.payload.id);
      if (index > -1) {
        // only splice array when item is found
        state.list.favourites.splice(index, 1);
      }
    },
    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateUserFavourite = (payload: UserFavourite) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const removeFavourite = (payload: { id: number }) => {
  return {
    type: slice.actions.removeFavaourite.type,
    payload,
  };
};

export const loadUserFavourite = () => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL,
      onStart: slice.actions.userFavouriteRequested.type,
      onSuccess: slice.actions.userFavouriteReceived.type,
      onError: slice.actions.userFavouriteFailed.type,
    })
  );
};

//  export reducer function
export const userFavouriteReducer = slice.reducer;

// Action Creators
