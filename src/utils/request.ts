/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {notification} from 'antd';
import {history} from "@@/core/history";
import {stringify} from "querystring";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const {response} = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 请求拦截
request.interceptors.request.use((url, options) => {
  // if(options.params.current){
  //   const pageable = {
  //     page: options.data.current,
  //     size: options.data.pageSize,
  //   };
  // eslint-disable-next-line no-param-reassign
  // options.data.pageable = pageable;
  // delete options.params.pageSize;
  // delete options.params.current;
  // }
  // console.log(options);
  return {
    url: `${url}`,
    options: {...options, interceptors: true},
  };
});
// 响应拦截
request.interceptors.response.use(async response => {
  const text = await response.clone().text();
  if (text.indexOf("pageable") > -1) {
    const data = await response.clone().json();
    return {
      data: data.content,
      page: data.number+1,
      success: true,
      total: data.totalElements,
    };
  }
  if (text.indexOf('msg') > -1) {
    const data = await response.clone().json();
    const code = data.code as number;
    if (code === 0) {
      if (data.data) {
        return data.data;
      }
    } else if (code === 401) {
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    } else {
      notification.error({
        description: data.msg,
        message: '网络异常',
      });
      return null;
    }
  }
  return response;
});


export default request;

function pageConditionHandler(data: any) {
  if (data && data.params.current) {
    const pageable = {
      page: data.params.current > 0 ? data.params.current - 1 : data.params.current,
      size: data.params.pageSize,
    };
    data.pageable = pageable;
    delete data.params.current;
    delete data.params.pageSize;
    Object.assign(data, data.params);
    delete data.params;
  }
}

export async function pageRequest(url: string, data?: any, method?: string) {
  pageConditionHandler(data);
  return request(`/api/${url}`, {
    method: method || 'POST',
    data,
  });
}

export async function asyncRequest(url: string, data?: any, method?: string) {
  Object.assign(data, data.params);
  delete data.params;
  return request(`/api/${url}`, {
    method: method || 'POST',
    data,
  });
}
