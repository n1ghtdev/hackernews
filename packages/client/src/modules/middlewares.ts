import jwt_decode from 'jwt-decode';
import { verifyRequest } from './auth/actions';

export const renewTokens = (store: any) => (next: any) => (action: any) => {
  const isActionRequest = /(.*)\/(request)/.exec(action.type);
  const isRefreshRequest = /verify/.exec(action.type);
  const token = store.getState().auth.accessToken;

  if (!token) {
    return next(action);
  }

  if (isActionRequest && !isRefreshRequest) {
    const { exp: tokenExpiresAt } = jwt_decode(token);
    const renewThreshold = new Date().getTime() + 25 * 60000;

    if (renewThreshold > tokenExpiresAt * 1000) {
      store.dispatch(verifyRequest());
    }
  }

  return next(action);
};
