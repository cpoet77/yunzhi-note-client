// @ts-ignore
/* eslint-disable */
import { message, notification } from 'antd';
import { extend } from 'umi-request';

const _USER_SESSION_STORAGE_KEY = '_session';

// 获取当前session
export const getCurrentSession = (): CurrentSession | undefined => {
  const session = localStorage.getItem(_USER_SESSION_STORAGE_KEY);
  return session ? (JSON.parse(session) as CurrentSession) : undefined;
}

// 设置session
export const setCurentSession = (currentSession?: CurrentSession) => {
  if (currentSession === undefined) {
    localStorage.removeItem(_USER_SESSION_STORAGE_KEY);
  } else {
    localStorage.setItem(_USER_SESSION_STORAGE_KEY, JSON.stringify(currentSession));
  }
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

// 异常处理程序
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const { status } = response;
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 [${status}]`,
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

// 配置request请求时的默认参数
const request = extend({
  // 错误处理
  errorHandler,
  // 是否带上cookie
  credentials: 'omit'
});


// 请求拦截器
request.interceptors.request.use((url, options): any => {
  const token = getCurrentSession()?.token;
  // 添加认证Token至请求头
  if (token) {
    return { url, options: { ...options, headers: { Authentication: token } } }
  }
  return { url, options };
});

const _TEXT_ENCODER = new TextEncoder();

// 响应拦截器
request.interceptors.response.use(async (response, options): Promise<any> => {
  const { status } = response;
  const ret = await response.clone().json();
  if (status === 200) {
    const { code, msg } = ret;
    if (code !== 0) {
      message.error(msg);
      return Promise.reject(response);
    }
    const stream = new ReadableStream({
      start: controller => {
        const newRetArr = _TEXT_ENCODER.encode(JSON.stringify(ret['data']));
        controller.enqueue(newRetArr);
        controller.close();
      }
    });
    return Promise.resolve(new Response(stream, { ...response }));
  }
  return Promise.reject(response);
});

export { request };
