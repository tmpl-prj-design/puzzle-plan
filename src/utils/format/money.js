/**
 * 金额格式化
 * @param {Number} money 具体金额
 * @param {Number} point 小数点后位数，默认2位
 */
export function moneyFormat(money, point = 2) {
  if (isNaN(Number(money)) || Number(money) === 0) return money
  let isNegativeStr = money < 0 ? '-' : ''
  money = Math.abs(money)
  // 转成字符串，忽略小数部分
  let moneyStr = money.toString().split('.')[0]
  let moneyInt = Number(money.toString().split('.')[0])
  if (moneyStr.length <= 4) {
    // 万以内直接返回
    return isNegativeStr + parseFloat(money).toFixed(point)
  } else if (moneyStr.length > 4 && moneyStr.length <= 8) {
    let decimal = moneyStr.substring(moneyStr.length - 4, moneyStr.length - 4 + point)
    return isNegativeStr + parseFloat(parseInt(moneyInt / 10000) + '.' + decimal) + '万'
  } else {
    // 大于8位数是亿
    let decimal = moneyStr.substring(moneyStr.length - 8, moneyStr.length - 8 + point)
    return isNegativeStr + parseFloat(parseInt(moneyInt / 100000000) + '.' + decimal) + '亿'
  }
}
