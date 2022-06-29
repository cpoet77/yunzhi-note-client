// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 账号密码登录 POST /auth/login */
export async function login(body: CommApi.AccountPassDTO, options?: { [key: string]: any }) {
  return request<any>(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}