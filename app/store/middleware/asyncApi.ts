import { AppDispatch } from '../storeContext';
import http, { HttpStatusCode, Method } from './http';


type ApiRequestParams = {
  url: string;
  method?: Method;
  params?: object;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
  data?: Record<string, unknown>;
  ttl?: number;
};

export const apiRequest = ({ url, method, data, params, onSuccess, onError, onStart }: ApiRequestParams) => {
  return async (dispatch: AppDispatch) => {
    const response = await http.request({
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
        if (response.data)
        console.log('Unauthorized')
      }
      if (onError) dispatch({ type: onError, payload: response });
      return { response, isError: response.isError };
    }
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data, status: response.status, message: response.statusText });
      return { data: response.data, isError: response.isError };
    }
    //  return response
  };
  
};

export default apiRequest;
