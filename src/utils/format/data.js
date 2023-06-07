/**
 * 为目标对象赋值
 * @param {object} data 值
 * @param {object} targetObj 目标对象
 * @param {object} alias key别名：{targetKey: newKey}
 * migrationObj({a: '', c: ''}, {a: 1, b: 2}, { c: 'b' }) => {a: 1, c: 2}
 */
export function migrationObj(targetObj = {}, data = {}, alias = {}) {
  Object.keys(targetObj).forEach(k => {
    const sK = alias[k] || k
    targetObj[k] = data[sK] || targetObj[k]
  })
  return targetObj
}
