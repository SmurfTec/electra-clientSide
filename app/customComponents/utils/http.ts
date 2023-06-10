import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode, Method } from 'axios';

const baseURL = 'http://ec2-3-21-106-215.us-east-2.compute.amazonaws.com:5000';
const httpRequest = axios.create({
  withCredentials: true,
  baseURL,
});
interface AxiosResponseWithError extends AxiosResponse {
  isError?: boolean;
  errorPayload?:Record<string, any> | null;
}
interface AxiosErrorWithError extends AxiosError {
  isError?: boolean;
  errorPayload?:Record<string, any> | null;
}
httpRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpRequest.interceptors.response.use(
  (response: AxiosResponseWithError) => {
    return { ...response, isError: false,errorPayload:null };
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
  return httpRequest.request(config);
}

export { HttpStatusCode };
export type { Method };
export const http = { ...httpRequest,request};


