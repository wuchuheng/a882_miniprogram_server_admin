// @ts-ignore
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 是否在有效期内
export function isExpired(): boolean {
  const hasToken = getToken();
  if (!hasToken) return false;
  const token = hasToken;
  let [, tokenInfo] = token.split('.');
  tokenInfo = atob(tokenInfo);
  tokenInfo = JSON.parse(tokenInfo);
  const exp = tokenInfo.exp as number;
  return exp > new Date().getTime() / 1000;
}
