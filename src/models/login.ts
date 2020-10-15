import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { ResponseState } from '@/services/Type';
import { setToken, removeToken } from '@/utils/auth';
import { currentUserRoleKey } from '@/utils/common';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    loginByCacheToken: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response: ResponseState = yield call(fakeAccountLogin, payload);
      if (response.success === true) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            // :xxx 这个字段可能是用户判断设备是pc或mobile等，作用
            type: 'pc',
          },
        });
        const data = response.data as { token: string };
        setToken(data.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        window.location.href = '/';
      } else {
        // eslint-disable-next-line consistent-return
        return Promise.reject(response.errorMessage);
      }
    },

    *loginByCacheToken(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'ok',
          // :xxx 这个字段可能是用户判断设备是pc或mobile等，作用
          type: 'pc',
        },
      });
    },

    logout() {
      const { redirect } = getPageQuery();
      removeToken();
      localStorage.removeItem(currentUserRoleKey);
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
