import { combineReducers } from '@reduxjs/toolkit';
import { websiteSectionReducer } from './slices/websiteSection';
import { protectionPlanReducer } from './slices';

export const entitiesReducers = combineReducers({
  websiteSection: websiteSectionReducer,
  protectionPlan: protectionPlanReducer
});
