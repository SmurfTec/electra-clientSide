import { combineReducers } from '@reduxjs/toolkit';
import { protectionPlanReducer, userFavouriteReducer, userRewardReducer, websiteSectionReducer } from './slices';

export const entitiesReducers = combineReducers({
  websiteSection: websiteSectionReducer,
  protectionPlan: protectionPlanReducer,
  userReward: userRewardReducer,
  userFavourite: userFavouriteReducer,
});
