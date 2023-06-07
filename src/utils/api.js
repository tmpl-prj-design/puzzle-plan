import { wMessageConfirm, wMessage } from './message'

/**
 * 获取接口请求最后一次的执行结果
 * 即 当网络加载慢，且对同一个接口触发多次请求时，仅返回最新一次接口的结果。
 * @param fn, fn 返回值需要是一个Promise
 * @returns
 */
export function latestExec(fn) {
  let queue = []
  return (...args) => {
    return new Promise((resolve, reject) => {
      const promiseHandler = fn(...args)
      queue.push(promiseHandler)
      promiseHandler
        .then(res => {
          if (queue[queue.length - 1] === promiseHandler) {
            resolve(res)
            queue = []
          }
        })
        .catch(reject)
    })
  }
}

/**
 * 接口请求合并
 * 应用场景：在不同场景下，点击同一个按钮，触发不同的操作
 * @param {function} apiFunc 接口函数
 * @param {Array} params 接口请求参数 [param1, param2, ...]
 * @param {string} errorMsg 默认错误提示
 * apiOperation(addAPI, [{ name: '' }], 'xxx').then(res => {})
 */
export function apiOperation(apiFunc, params, errorMsg) {
  return new Promise(resolve => {
    apiFunc(...params).then(res => {
      if (res.code !== 200) {
        wMessage.error(errorMsg || res.message || 'Error')
      }
      resolve(res)
    })
  })
}

/**
 * 确认框以及接口请求通用方法，比如删除操作、启动操作等操作
 * @param {function} apiFunc 某个接口函数
 * @param {object} params 接口请求参数
 * @param {function} cb 回调函数
 * @param {object} config 提示配置
 * confirmApiOperation({content: '', title: ''}, addNodeAPI, formData, () => { console.log('success') }, )
 */
export function confirmApiOperation(config, apiFunc, params, errorMsg) {
  return new Promise(resolve => {
    wMessageConfirm(config, () => {
      apiFunc(...params).then(res => {
        if (res.code !== 200) {
          wMessage.error(errorMsg || res.message || 'Error')
        }
        resolve(res)
      })
    })
  })
}

/**
 * GET类型接口参数处理
 * @param {Object} params 原始参数对象
 * @param {Object} options 修改的参数对象
 * @param {Function} cb 回调函数
 * @example paramsFormat(params, {type: 'curPageIdx', val: 2}, getList)
 *
 * params 参数约定：
 * 分页：pageNo, pageSize
 * 时间：startTime, endTime
 * 排序：desc, order
 * 搜索：search
 */
export function paramsFormat(params, { type, val }, cb) {
  // 切换页码
  if (type === 'curPageIdx') {
    params.pageNo = val
    return cb && cb()
  }

  // 更新排序规则
  if (type === 'sort') {
    if (!val.order || !val.prop) return
    params.desc = val.order === 'descending'
    params.order = val.prop
    return cb && cb()
  }

  // 根据条件筛选 or 搜索时。注意需要重置页码
  if (type === 'times') {
    params.startTime = val && val[0] ? val[0] : ''
    params.endTime = val && val[1] ? val[1] : ''
  } else {
    params[type] = val
  }
  const pageNumExit = params.pageNo && params.pageNo > -1
  if (pageNumExit) {
    params.pageNo = 1
  }
  return cb && cb()
}
