import {asyncRequest, pageRequest} from '@/utils/request';

export async function queryRoleByPage(params?: any) {
  return pageRequest('/role/queryByPage', {
    params,
  });
}

export async function changeStatus(params?: any) {
  return asyncRequest('/role/status', {params});
}

export async function roleDetail(id: number) {
  return asyncRequest(`/role/detail/${id}`);
}

export async function roleUpdate(params?: any) {
  return asyncRequest('/role/save', params);
}

export async function getAllPermission() {
  return asyncRequest('/role/allPermission');
}
