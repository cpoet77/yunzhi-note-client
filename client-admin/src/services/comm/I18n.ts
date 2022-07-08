// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 获取国际化包 GET /i18n/listI18n */
export async function listI18n(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommApi.listI18nParams,
  options?: { [key: string]: any },
) {
  return request<CommApi.I18nMapVO>(`/api/i18n/listI18n`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
