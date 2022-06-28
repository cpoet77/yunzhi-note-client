// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取用户基本信息 GET /member/getInfo */
export async function getInfo(options?: { [key: string]: any }) {
  return request<any>(`/api/member/getInfo`, {
    method: 'GET',
    ...(options || {}),
  });
}
