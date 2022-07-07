// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 获取用户基本信息 GET /member/getInfo */
export async function getInfo(options?: { [key: string]: any }) {
  return request<CommApi.MemberInfoVO>(`/api/member/getInfo`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户拥有的权限列表 GET /member/listMemberPermission */
export async function listMemberPermission(options?: { [key: string]: any }) {
  return request<CommApi.PermissionTreeVO[]>(`/api/member/listMemberPermission`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户拥有的角色列表 GET /member/listMemberRole */
export async function listMemberRole(options?: { [key: string]: any }) {
  return request<CommApi.RoleVO[]>(`/api/member/listMemberRole`, {
    method: 'GET',
    ...(options || {}),
  });
}
