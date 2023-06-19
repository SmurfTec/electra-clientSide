import { IncomingMessage } from 'http';
import { http } from './http';

export const setAxiosHeader = async (request: IncomingMessage | undefined) => {
  const req = request as {
    cookies: {
      authorization: string;
      refresh: string;
    };
  } & IncomingMessage;
  const headers = req.cookies;
  http.defaults.headers.common = { ...http.defaults.headers.common, ...headers };
};
