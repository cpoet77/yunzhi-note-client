// @ts-ignore
/* eslint-disable */
import { RequestConfig } from "umi";
import { ResponseInterceptor, RequestOptionsInit } from 'umi-request'

const respInterceptor: ResponseInterceptor = (resp: Response, options: RequestOptionsInit): Response => {
  console.log(333, resp);
  return resp;
};

export const requestConfig: RequestConfig = {
  charset: 'utf8',
  requestType: 'json',
  responseInterceptors: [respInterceptor],
  errorConfig: {
    adaptor: (ret) => {
      return {
        ...ret,
        success: ret.code === 0,
        data: ret.data,
        errorCode: ret.code,
        errorMessage: ret.msg
      };
    }
  }
};
