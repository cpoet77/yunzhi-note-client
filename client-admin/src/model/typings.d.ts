// 用户信息
type CurrentUser = {
  // 用户id
  id: string,
  // 用户姓名
  name: string,
  // 用户账号信息
  account: string
};

// 用户会话信息
type UserSession = {
  // 会话Token
  token: string,
  // Token过期时间
  expired: Date
}
