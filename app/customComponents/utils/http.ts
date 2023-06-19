import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode, Method } from 'axios';
import { getCookie } from 'cookies-next';

// const baseURL = 'http://ec2-3-21-106-215.us-east-2.compute.amazonaws.com:5000';
export const baseURL = 'http://ec2-3-21-106-215.us-east-2.compute.amazonaws.com:5000';
const httpRequest = axios.create({
  withCredentials: true,
  baseURL,
});
interface AxiosResponseWithError extends AxiosResponse {
  isError?: boolean;
  errorPayload?: Record<string, any> | null;
}
interface AxiosErrorWithError extends AxiosError {
  isError: boolean;
  errorPayload?: Record<string, any> | null;
}

httpRequest.interceptors.response.use(
  (response: AxiosResponseWithError) => {
    return { ...response, isError: false, errorPayload: null };
  },
  (error: AxiosErrorWithError) => {
    const errorMessage = {
      statusCode: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      isError: true,
      errorPayload: error.response?.data,
    };
    return errorMessage;
  }
);
function request<R = AxiosResponseWithError, D = unknown>(config: AxiosRequestConfig<D>): Promise<R> {
  const headertoken = getHeaders();
  config.headers = typeof window !== 'undefined' ? { ...config.headers, ...headertoken } : config.headers;
  return httpRequest.request(config);
}

function getHeaders() {
  const authentication = getCookie('authentication');
  const refresh = getCookie('refresh');
  return { authentication, refresh };
}

export { HttpStatusCode };
export type { Method };
export const http = { ...httpRequest, request };
