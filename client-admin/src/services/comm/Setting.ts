// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 获取公共系统配置 POST /setting/getPubSetting */
export async function getPubSetting(body: string[], options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/setting/getPubSetting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取个人配置 POST /setting/getSetting */
export async function getSetting(body: string[], options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/setting/getSetting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
