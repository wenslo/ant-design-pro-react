import request, {pageRequest} from '@/utils/request';

export async function queryUserByPage(params?: any) {
  console.log(params);
  return pageRequest('/user/queryByPage', {
    params,
  });
}
