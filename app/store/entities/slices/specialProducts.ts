import { apiRequest } from '@elektra/store/middleware';
import { AppDispatch } from '@elektra/store/storeContext';
import { Product } from '@elektra/types';
import { createSlice } from '@reduxjs/toolkit';

const trendingURL = '/products/trending';
const trendingProtectedURL = '/products/trending/protected';

// const trendingURL = '/products/?sort=-created_on';
const latestURL = '/products/?sort=-created_on';
const latestProtectedURL = '/products/protected?sort=-created_on';
const mostSoldURL = '/products/sold';
const mostSoldProtectedURL = '/products/protected/sold';
const recommendedURL = '/products/recommended';
const recommendedProtectedURL = '/products/recommended/protected';

const shopProducts = '/products';
const shopProtectedProducts = '/products/protected';

type ProductData = {
  mostSold: Product;
  trending: Product;
  latest: Product;
  showMore?: Product;
  recommended?: Product;
  shopProducts?: Product;
};

type specialProduct = {
  list: ProductData;
  loading: boolean;
};

const initialState: specialProduct = {
  list: {
    mostSold: { products: [] },
    trending: { products: [] },
    latest: { products: [] },
    showMore: { products: [] },
    recommended: { products: [] },
    shopProducts: { products: [] },
  },
  loading: false,
};

const slice = createSlice({
  name: 'specialProducts',
  initialState,
  reducers: {
    specialProductRequested: (state) => {
      state.loading = true;
    },

    trendingReceived: (state, action) => {
      state.list.trending = action.payload;
      state.loading = false;
    },

    mostSoldReceived: (state, action) => {
      state.list.mostSold = action.payload;
      state.loading = false;
    },
    latestReceived: (state, action) => {
      state.list.latest = action.payload;
      state.loading = false;
    },

    showMoreReceived: (state, action) => {
      state.list.showMore = action.payload;
      state.loading = false;
    },

    shopProductsReceived: (state, action) => {
      console.log(action.payload);
      state.list.shopProducts = action.payload;
      state.loading = false;
    },

    likeProductStart: (state, action) => {
      console.log(action.payload);
    },
    likeProductFailure: (state, action) => {
      console.log(action.payload);
    },
    likeProductSuccess: (state, action) => {
      console.log(action.payload);
    },

    recommendedReceived: (state, action) => {
      state.list.recommended = action.payload;
      state.loading = false;
    },

    rehydrateSpecialProduct: (state, action) => {
      state.loading = true;
      (state.list.latest = action.payload.latest), (state.list.mostSold = action.payload.mostSold);
      state.list.trending = action.payload.trending;

      state.list.shopProducts = action.payload.shopProducts ?? [];
      state.loading = false;
    },

    rehydrateShopProduct: (state, action) => {
      state.loading = true;
      state.list.shopProducts = action.payload;
      state.loading = false;
    },

    specialProductFailed: (state) => {
      state.loading = false;
    },
  },
});

export const rehydrateSpecialProducts = (payload: ProductData) => {
  return {
    type: slice.actions.rehydrateSpecialProduct.type,
    payload,
  };
};

export const rehydrateShopProducts = (payload: Product) => {
  return {
    type: slice.actions.rehydrateShopProduct.type,
    payload,
  };
};

export const loadTrendingProducts = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: isAuth ? trendingProtectedURL : trendingURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.trendingReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const fetchShowMoreProducts = (param: string, isAuth: boolean) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: isAuth ? shopProtectedProducts : shopProducts + `?title=%${param}%`,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.showMoreReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const loadRecommendedProducts = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: isAuth ? recommendedProtectedURL : recommendedURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.recommendedReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const likeProduct = (data: { product?: number; listing?: number }) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: '/favourites',
      method: 'POST',
      data,
      onStart: slice.actions.likeProductStart.type,
      onSuccess: slice.actions.likeProductSuccess.type,
      onError: slice.actions.likeProductFailure.type,
    })
  );
};
export const UnlikeProduct = (data: { product?: number; listing?: number }) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: '/favourites',
      method: 'DELETE',
      data,
      onStart: slice.actions.likeProductStart.type,
      onSuccess: slice.actions.likeProductSuccess.type,
      onError: slice.actions.likeProductFailure.type,
    })
  );
};

export const fetchShopProducts =
  (isAuth: boolean, param: string = '') =>
  async (dispatch: AppDispatch) => {
    const finalUrl = isAuth ? shopProtectedProducts : shopProducts;
    console.log(finalUrl + `${param}`);
    return await dispatch(
      apiRequest({
        url: finalUrl + `${param}`,
        onStart: slice.actions.specialProductRequested.type,
        onSuccess: slice.actions.shopProductsReceived.type,
        onError: slice.actions.specialProductFailed.type,
      })
    );
  };
export const loadFilterProducts =
  (isAuth: boolean, params: string = '&limit=15&page=1') =>
  async (dispatch: AppDispatch) => {
    // console.log(isAuth ? shopProtectedProducts : shopProducts + `?${params}`);
    console.log(isAuth ? shopProtectedProducts + `?${params}` : shopProducts + `?${params}`);
    return await dispatch(
      apiRequest({
        url: isAuth ? shopProtectedProducts + `?${params}` : shopProducts + `?${params}`,
        onStart: slice.actions.specialProductRequested.type,
        onSuccess: slice.actions.shopProductsReceived.type,
        onError: slice.actions.specialProductFailed.type,
      })
    );
  };

export const loadLatestProducts = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: isAuth ? latestProtectedURL : latestURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.latestReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

export const loadMostSoldProducts = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  return await dispatch(
    apiRequest({
      url: isAuth ? mostSoldProtectedURL : mostSoldURL,
      onStart: slice.actions.specialProductRequested.type,
      onSuccess: slice.actions.mostSoldReceived.type,
      onError: slice.actions.specialProductFailed.type,
    })
  );
};

//  export reducer function
export const specialProductReducer = slice.reducer;

// Action Creators
