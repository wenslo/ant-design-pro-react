import {Effect, Reducer} from 'umi';
import {queryUserByPage} from "@/pages/system/user/service";

export interface SystemUserModelState {
  pageData?: {};
}

export interface SystemUserModelType {
  namespace: 'systemUser';
  state: SystemUserModelState;
  effects: {
    fetchUserList: Effect;
  };
  reducers: {
    changeUserList: Reducer<{}>;
  };
}

const SystemUserModel: SystemUserModelType = {
  namespace: 'systemUser',
  state: {
    pageData: {},
  },
  effects: {
    * fetchUserList({payload}, {call, put}) {
      const data = yield call(queryUserByPage, payload);
      yield put({
        type: 'changeUserList',
        payload: data,
      })
    }
  },
  reducers: {
    changeUserList(state, {payload}) {
      return {
        ...state,
        pageData: payload
      };
    },
  },
};
export default SystemUserModel;
