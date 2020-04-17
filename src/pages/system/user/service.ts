import request from '@/utils/request';

export async function queryUserByPage(params?: any) {
  return request('/api/user/queryByPage', {
    params,
  });
}
