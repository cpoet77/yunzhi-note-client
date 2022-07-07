// 用户信息
type CurrentUser = {
  // 用户id
  id?: number,
  // 用户昵称
  nickName?: string,
  // 用户账号信息
  account?: string
};

// 用户会话信息
type CurrentSession = {
  // 用户uid
  uid?: number,
  // 会话Token
  token?: string,
  // Token过期时间
  expired?: string
}
