import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { WebsiteSection } from '@elektra/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type WebsiteSectionData = {
  response: WebsiteSection;
  loading: boolean;
};

const URL = '/websites';

const initialState: WebsiteSectionData = {
  response: {
    data: {},
    isError: false
  },
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
      fp.response = action.payload;
      fp.loading = false;
    },

    sectionFailed: (fp) => {
      fp.loading = false;
    },

    rehydrated: (state, action: PayloadAction<WebsiteSection>) => {
      state.loading = true;
      state.response = action.payload;
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
