/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import config from '@/config';
import { isExpired, getToken } from '@/utils/auth';

/**
 *  异常返回格式
 */
export interface ErrorExceptionState {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  showType: number;
}

/**
 * 正常响应格式
 */

export interface ResponseState {
  success: boolean;
  data?: Array<any>;
  showType?: number;
  erroeMessage?: string;
}

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
const errorHandler = async (error: { response: Response }): Promise<ErrorExceptionState> => {
  const  response  = await error.response;
  // 服务端报错
  const data = await response.clone().json() as ErrorExceptionState;
  if (data) {
    if (data.showType === 4) {
      notification.error({
        message: `请求错误`,
        description: data.errorMessage,
      });
    }
    return Promise.reject(data);
  }
  // http状态码异常
  const errorText = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errorText,
  });
  const stateError = {
    success: false,
    errorCode: status,
    errorMessage: url
  };
  return Promise.reject(stateError)
};

/**
 * 配置request请求时的默认参数
 */
const options = {
  prefix: config.baseRequestUrl,
  errorHandler, // 默认错误处理
  headers: {},
};

if (isExpired()) {
  options.headers = {
    Authorization: `Bearer ${getToken()}`,
  };
}

const request = extend(options);

// 异常响应处理
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  // 服务端异常
  if (data.success === false && data.showType) {
    throw { response };
  }
  return response;
});

export default request;
