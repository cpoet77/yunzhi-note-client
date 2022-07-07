// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 账号密码登录 POST /auth/login */
export async function login(body: CommApi.AccountPassDTO, options?: { [key: string]: any }) {
  return request<CommApi.AuthTokenVO>(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
