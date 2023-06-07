/**
 * 字节单位格式化
 * @param {Number} size 大小
 * @param {String} unit 当前单位
 */
export const byteFormat = (size, unit = 'B', useLowerSymbol = false, ingoreSpace = false) => {
  if (isNaN(Number(size))) {
    return size
  }
  size = Number(size)
  // 定义基本单位
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const lowerSymbols = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
  if (unit === 'Bit') {
    size = size / 8
    unit = 'B'
  }

  // 判断原始单位
  const unitIdx = symbols.indexOf(unit)
  if (unitIdx === -1) {
    return size
  }

  // 根据原始单位获取bytes，math.pow 幂函数
  let bytes = Number(size) * Math.pow(1024, symbols.indexOf(unit))

  // 单位转化，利用1024=2的10次方， Math.log取对数，默认以2.302585092994046为底数， Math.log(x)/Math.log(y)表示以x为底y的对数
  if (bytes !== 0) {
    var exp = Math.floor(Math.log(bytes) / Math.log(2))
    if (exp < 1) {
      exp = 0
    }
    var i = Math.floor(exp / 10)
    bytes = bytes / Math.pow(2, 10 * i)

    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
      bytes = bytes.toFixed(2)
    }
    bytes = bytes + (ingoreSpace ? '' : ' ') + (useLowerSymbol ? lowerSymbols[i] : symbols[i])
  } else {
    bytes = '0' + unit || 'B'
  }
  return bytes
}
