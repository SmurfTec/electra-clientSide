import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan', function prepare(payload: Record<string, unknown>) {
  return {
    payload,
  };
});
export const apiCallSuccess = createAction('api/callSuccess', function prepare(payload: Record<string, unknown>) {
  return {
    payload,
  };
});
export const apiCallFailed = createAction('api/callFailed', function prepare(payload: Record<string, unknown>) {
  return {
    payload,
  };
});
