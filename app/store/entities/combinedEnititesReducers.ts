import { combineReducers } from '@reduxjs/toolkit';
import { websiteSectionReducer } from './slices/websiteSection';
import { protectionPlanReducer, userRewardReducer } from './slices';

export const entitiesReducers = combineReducers({
  websiteSection: websiteSectionReducer,
  protectionPlan: protectionPlanReducer,
  userReward: userRewardReducer,
});
