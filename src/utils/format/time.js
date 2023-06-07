import dayjs from 'dayjs'
/**
 * 日期格式化
 * @param {Number} time 时间戳
 * @param {String} formatType 格式，默认YYYY/MM/DD hh:mm:ss
 */
export function timeFormat(time, formatType = 'YYYY/MM/DD HH:mm:ss') {
  const date = Number(time)
  if (!dayjs(date).isValid() || !date || date <= 0) return ''
  return dayjs(date).format(formatType)
}

/**
 * 时分秒单位格式化
 * @param {Number} val 秒
 * @example timeUnitFormat(61) => 1分钟1秒
 */
export function timeUnitFormat(val) {
  const s = parseInt(val)
  if (s <= 0) return ''
  const day = Math.floor(s / (24 * 3600))
  const hour = Math.floor((s - day * 24 * 3600) / 3600)
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60
  return `${day > 0 ? day + '天' : ''}${hour > 0 ? hour + '小时' : ''}${minute > 0 ? minute + '分钟' : ''}${second > 0 ? second + '秒' : ''}`
}
