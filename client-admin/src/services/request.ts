// @ts-ignore
/* eslint-disable */
import { RequestConfig } from 'umi';
import { ResponseInterceptor } from 'umi-request'

const _REQS_RESULT_KEY = '$ret';

const _TEXT_ENCODER = new TextEncoder();

// 响应拦截器
const respInterceptor: ResponseInterceptor = (resp, options) => {
  console.log(resp.body?.getReader);
  // 对请求结果进行二次封装，方便后续对数据的使用
  return resp.json()
    .then(ret => {
      const newRet = { ...ret.data };
      newRet[_REQS_RESULT_KEY] = ret;
      const stream = new ReadableStream({
        start: controller => {
          const newRetArr = _TEXT_ENCODER.encode(JSON.stringify(newRet));
          controller.enqueue(newRetArr);
          controller.close();
        }
      });
      return Promise.resolve(new Response(stream, { ...resp }));
    }).catch(err => {
      console.error(`Failed to parse the returned result: ${err}`);
      return Promise.reject(resp);
    });
};

export const requestConfig: RequestConfig = {
  charset: 'utf8',
  requestType: 'json',
  responseInterceptors: [respInterceptor],
  errorConfig: {
    adaptor: ret => {
      const $ret = ret[_REQS_RESULT_KEY];
      return {
        success: $ret.code === 0,
        data: ret,
        errorCode: $ret.code,
        errorMessage: $ret.msg
      };
    }
  }
};
