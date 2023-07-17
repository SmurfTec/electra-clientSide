import { combineReducers } from '@reduxjs/toolkit';
import {
  purchasingOrdersReducer,sellingOrdersReducer, protectionPlanReducer,
  specialProductReducer,
  userFavouriteReducer,
  userRewardReducer,
  websiteSectionReducer,
  productDataReducer,
  orderDetailReducer,
  productListingReducer,
} from './slices';

export const entitiesReducers = combineReducers({
  websiteSection: websiteSectionReducer,
  protectionPlan: protectionPlanReducer,
  userReward: userRewardReducer,
  userFavourite: userFavouriteReducer,
  purchasingOrders: purchasingOrdersReducer,
  sellingOrders: sellingOrdersReducer,
  specialProducts: specialProductReducer,
  productDetail: productDataReducer,
  orderDetail: orderDetailReducer,
  productListing: productListingReducer
});
