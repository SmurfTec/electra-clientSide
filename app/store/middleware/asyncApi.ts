import { http, HttpStatusCode, Method } from '@elektra/customComponents';
import { logout } from '../entities';
import { AppDispatch } from '../storeContext';

type ApiRequestParams = {
  url: string;
  method?: Method;
  params?: object;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
  data?: Record<string,unknown>;
  ttl?: number;
};

export const apiRequest = <T>({ url, method, data, params, onSuccess, onError, onStart }: ApiRequestParams) => {
  return async (dispatch: AppDispatch) => {
    const response = await http.request<T>({
      url,
      method: method || 'GET',
      data,
      params,
    });
    if (onStart) {
      dispatch({ type: onStart });
    }
    if (response.isError) {
      if (response.status === HttpStatusCode.Unauthorized) {
        if (response.data) dispatch(logout());
      }
      if (onError) dispatch({ type: onError, payload: response });
      return response;
    }
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data, status: response.status, message: response.statusText });
      return response;
    }
    return response;
  };
};

export default apiRequest;
