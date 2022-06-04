// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 用户登录 获取授权凭证(Token) POST /auth/login */
export async function login(options?: { [key: string]: any }) {
  return request<API.AuthVO>('/auth/login', {
    method: 'POST',
    ...(options || {}),
  });
}
