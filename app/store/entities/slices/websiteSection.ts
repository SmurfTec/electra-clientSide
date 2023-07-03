import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { WebsiteSection } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

export type WebsiteSectionData = {
  list: WebsiteSection;
  
  loading: boolean;
};

const URL = '/websites';

const initialState: WebsiteSectionData = {
  list: {},
  loading: false,
};

const slice = createSlice({
  name: 'websiteSection',
  initialState,
  reducers: {
    sectionRequested: (fp) => {
      fp.loading = true;
    },

    sectionReceived: (fp, action) => {
      fp.list = action.payload;
      fp.loading = false;
    },

    sectionFailed: (fp) => {
      fp.loading = false;
    },

    rehydrated: (state, action) => {
      state.loading = true;
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const rehydrateWebsiteSection = (payload: WebsiteSection) => {
  return {
    type: slice.actions.rehydrated.type,
    payload,
  };
};

export const loadWebsiteSection = (id: number) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: URL + `/${id}`,
      onStart: slice.actions.sectionRequested.type,
      onSuccess: slice.actions.sectionReceived.type,
      onError: slice.actions.sectionFailed.type,
    })
  );
};

//  export reducer function
export const websiteSectionReducer = slice.reducer;

// Action Creators
