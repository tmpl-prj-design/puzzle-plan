// 用户名为2-16位大小写字母数字_-符号组成，开头必须字母
export const NameRegx = /^[a-zA-Z][a-zA-Z0-9_-]{1,15}$/

// 昵称为2-16位大小写字母汉字数字_-符号组成，开头不能为数字
export const NicknameRegx = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9_-]{1,15}$/

// 正整数
export const PositiveIntRegx = /^[1-9]\d*$/

// IP
export const IpRegx =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

// 密码至少包含数字、字母、特殊字符2种以上，6-16位
export const PasswordRegx = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]{6,16})$/

// 手机号码
export const PhoneRegx = /^1[3-9]\d{9}$/
