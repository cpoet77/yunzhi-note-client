// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 获取用户基本信息 POST /member/getInfo */
export async function getInfo(options?: { [key: string]: any }) {
  return request<CommApi.MemberInfoVO>(`/api/member/getInfo`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取用户拥有的权限列表 POST /member/listMemberPermission */
export async function listMemberPermission(options?: { [key: string]: any }) {
  return request<CommApi.PermissionTreeVO[]>(`/api/member/listMemberPermission`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取用户拥有的角色列表 POST /member/listMemberRole */
export async function listMemberRole(options?: { [key: string]: any }) {
  return request<CommApi.RoleVO[]>(`/api/member/listMemberRole`, {
    method: 'POST',
    ...(options || {}),
  });
}
