declare namespace CommApi {
  type AccountPassDTO = {
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
    /** 验证码 */
    captcha?: string;
  };

  type AuthTokenVO = {
    /** 用户id */
    uid?: number;
    /** 认证Token */
    token?: string;
    /** 过期时间 */
    expired?: string;
  };

  type MemberInfoVO = {
    /** 用户id */
    id?: number;
    /** 用户账号 */
    account?: string;
    /** 昵称 */
    nickName?: string;
    /** 用户组id */
    groupId?: number;
    /** 用户组名称 */
    groupName?: string;
    /** 个人简介 */
    summary?: string;
  };

  type PermissionTreeVO = {
    /** 权限id */
    id?: number;
    /** 父权限id */
    parentId?: number;
    /** 资源编码 */
    code?: string;
    /** 资源名称 */
    name?: string;
    /** 路径 */
    path?: string;
    /** 图标 */
    icon?: string;
    /** 绑定的i18n */
    bindI18n?: string;
    /** 排序 */
    sorted?: number;
    /** 权限类型 */
    type?: '1' | '2' | '4' | '8' | '16' | '1024';
    /** 子权限列表 */
    children?: PermissionTreeVO[];
  };

  type ResultVOObject = {
    /** 响应时间戳 */
    timestamp?: number;
    /** 结果数据 */
    data?: Record<string, any>;
    message?: string;
    /** 响应码 */
    code?: number;
    /** 链路跨度Id */
    spanId?: number;
  };

  type RoleVO = {
    /** 角色id */
    id?: number;
    /** 角色编码 */
    code?: string;
    /** 角色名称 */
    name?: string;
    /** 排序 */
    sorted?: number;
    /** 绑定的I18n */
    bindI18n?: string;
  };
}
