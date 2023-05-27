import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

const httpRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_URL,
});
httpRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const errorMessage = {
      statusCode: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      errorResponse: error.response?.data,
    };
    return Promise.reject(errorMessage);
  }
);

export { HttpStatusCode };
export default httpRequest;
