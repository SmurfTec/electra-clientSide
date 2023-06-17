import { IncomingMessage } from 'http';
import { http } from './http';
import { has } from 'lodash'

export const isAuthenticated = async (request: IncomingMessage | undefined) => {
  const req = request as {
    cookies: {
      authorization: string;
      refresh: string;
    };
  } & IncomingMessage;
  const headers = req.cookies;
  if (!has(headers, 'authentication')) return false;
  const res = await http.request({
    url: 'auth/is_authenticated',
    method: 'GET',
    headers,
  });
  if (res.isError) return false;
  else return true;
};
