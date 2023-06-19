import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { websiteSectionReducer } from './slices/websiteSection';
import { protectionPlanReducer } from './slices';

export const entitiesReducers = combineReducers({
  auth: authReducer,
  websiteSection: websiteSectionReducer,
  protectionPlan: protectionPlanReducer
});
