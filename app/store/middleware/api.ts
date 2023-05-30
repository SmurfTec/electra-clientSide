import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import * as actions from '../actions';
import http, { HttpStatusCode } from './http';

export const apiMiddleWare =
  ({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  async (action: AnyAction) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { url, method, data, onSuccess, onError, onStart, params } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    const response = await http.request({
      url,
      method,
      data,
      params,
    });
    try {
      dispatch(actions.apiCallSuccess({ ...response.data }));
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: response.data,
          request: data,
          status: response.status,
          message: response.statusText,
        });
    } catch (error) {
      if (response.status === HttpStatusCode.Unauthorized) {
        console.log('Unauthorized');
      }
      dispatch(actions.apiCallFailed({ ...response }));
      if (onError) dispatch({ type: onError, payload: response });
    }
  };