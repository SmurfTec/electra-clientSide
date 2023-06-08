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
    if (response.isError) {
      if (response.status === HttpStatusCode.Unauthorized) {
        if (response.data) console.log('unauthorized');
      }
      dispatch(actions.apiCallFailed({ ...response }));
      if (onError) dispatch({ type: onError, payload: response });
    } else {
      dispatch(actions.apiCallSuccess({ ...response.data }));
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: response.data,
          request: data,
          status: response.status,
          message: response.statusText,
        });
    }
  };
