import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode, Method } from 'axios';
import { getCookie } from 'cookies-next';

export const baseURL = 'http://ec2-18-118-28-197.us-east-2.compute.amazonaws.com:3010';
const httpRequest = axios.create({
  withCredentials: true,
  baseURL,
  headers:{
    "ngrok-skip-browser-warning": true,
  }
});
interface AxiosResponseWithError extends AxiosResponse {
  isError?: boolean;
  errorPayload?: Record<string, any> | null;
}
interface AxiosErrorWithError extends AxiosError {
  isError: boolean;
  errorPayload: Record<string, any> | null;
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

export const setAxiosHeader = async (headers: { authentication: string; refresh: string }) => {
  http.defaults.headers.common = { ...http.defaults.headers.common, ...headers };
};

export { HttpStatusCode };
export type { Method };
export const http = { ...httpRequest, request };
