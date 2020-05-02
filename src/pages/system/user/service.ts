import {asyncRequest, pageRequest} from '@/utils/request';

export async function queryUserByPage(params?: any) {
  return pageRequest('/user/queryByPage', {
    params,
  });
}

export async function changeStatus(params?: any) {
  return asyncRequest('/user/status', {params});
}

export async function userDetail(id: number) {
  return asyncRequest(`/user/detail/${id}`);
}

export async function userUpdate(params?: any) {
  return asyncRequest('/user/save', params);
}

export async function userRemove(id: number) {
  return asyncRequest(`/user/remove/${id}`);
}

export async function userPwdReset(params?: any) {
  return asyncRequest('/user/reset', params);
}

export async function getAllRole() {
  return asyncRequest('/user/getAllRole');
}
