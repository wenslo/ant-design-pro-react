import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function login(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout(params: LoginParamsType) {
  return request('/api/logout', {
    method: 'POST',
    data: params,
  });
}
