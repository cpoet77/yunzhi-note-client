// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 获取国际化包 POST /i18n/listI18n */
export async function listI18n(body: CommApi.I18nQueryDTO, options?: { [key: string]: any }) {
  return request<CommApi.I18nMapVO>(`/api/i18n/listI18n`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
