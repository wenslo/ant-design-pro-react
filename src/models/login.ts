import {stringify} from 'querystring';
import {Effect, history, Reducer} from 'umi';

import {login, logout} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {notification} from "antd";

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

interface userAuthority {
  authority: string;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
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
    * login({payload}, {call, put}) {
      const response = yield call(login, payload);
      if (response) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        notification.success({
          message: '欢迎登录！',
        });
        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
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
        history.replace(redirect || '/');
      }
    },

    * logout(_, {call}) {
      const {redirect} = getPageQuery();
      yield call(logout);
      notification.success({message: '登出成功！'});
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
    changeLoginStatus(state, {payload}) {
      const currentAuthority: string[] = [];
      payload.user.authorities.forEach((it: userAuthority) => {
        currentAuthority.push(it.authority);
      });
      setAuthority(currentAuthority);
      return {
        ...state,
        // status: payload.status,
        // type: payload.type,
      };
    },
  },
};

export default Model;
