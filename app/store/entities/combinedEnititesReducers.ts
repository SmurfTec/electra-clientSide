import { combineReducers } from '@reduxjs/toolkit';
import {
  couponReducer,
  feeReducer,
  orderDetailReducer,
  productDataReducer,
  productLisingByIdReducer,
  productListingReducer,
  productVariantReducer,
  protectionPlanReducer,
  purchasingOrdersReducer,
  sellingOrdersReducer,
  specialProductReducer,
  userFavouriteReducer,
  userRewardReducer,
  websiteSectionReducer,
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
  productListing: productListingReducer,
  productVariants: productVariantReducer,
  productListingById: productLisingByIdReducer,
  coupon: couponReducer,
  fee: feeReducer,
});
