import {Effect, Reducer} from 'umi';

import {queryCurrent} from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  nickname?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: number;
  unreadCount?: number;
}

export interface EnumItem {
  origin: number,
  value: string,
  label: string,
}

export interface UserModelState {
  currentUser?: CurrentUser;
  enums?: Map<string, EnumItem[]>;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    enums: new Map<string, EnumItem[]>(),
  },

  effects: {
    * fetchCurrent(_, {call, put}) {
      const data = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: data.user,
        enums: data.enums,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
        enums: action.enums || new Map(),
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
        enums: new Map<string, EnumItem[]>(),
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
