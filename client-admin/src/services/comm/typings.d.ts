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

  type ResultVO = {
    /** 响应时间戳 */
    timestamp?: number;
    /** 结果数据 */
    data?: Record<string, any>;
    /** 响应码 */
    code?: number;
  };
}
