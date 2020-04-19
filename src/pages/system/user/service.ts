import request, {pageRequest} from '@/utils/request';

export async function queryUserByPage(params?: any) {
  return pageRequest('/user/queryByPage', {
    params,
  });
}
