import {asyncRequest, pageRequest} from '@/utils/request';

export async function queryUserByPage(params?: any) {
  return pageRequest('/user/queryByPage', {
    params,
  });
}
export async function changeStatus(params?: any) {
  return asyncRequest('/user/status', {params});
}
export async function userDetail(id : number) {
  return asyncRequest(`/user/detail/${id}`);
}
