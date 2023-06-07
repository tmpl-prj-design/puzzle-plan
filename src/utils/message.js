import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 消息提示, 3s内多次相同提示仅提示一次
 * @param {*} message 消息内容
 * @param {boolean} showClose 属否展示关闭按钮，默认展示
 * @param {number} duration 延迟关闭的时间， 默认3000
 * wMessage.success('success msg')
 */
let lastMessage = ''
function messageFunc() {
  const [type, message, showClose = true, duration = 3000] = arguments
  if (!message) {
    lastMessage = ''
    return
  }
  if (lastMessage && lastMessage === message) {
    return
  }
  lastMessage = message
  setTimeout(() => {
    lastMessage = ''
  }, 3000)
  ElMessage({
    type,
    message,
    duration,
    showClose,
    customClass: 'g-message'
  })
}
export const wMessage = {
  success() {
    return messageFunc('success', ...arguments)
  },
  error() {
    return messageFunc('error', ...arguments)
  },
  warning() {
    return messageFunc('warning', ...arguments)
  },
  info() {
    return messageFunc('info', ...arguments)
  }
}

/**
 * 消息确认弹窗，常用于操作
 * @param {object} options 消息内容
 * @param {func} confirmCb 点击确认按钮的回调函数
 * @param {func} cancelCb 点击取消按钮的回调函数
 * wMessageConfirm({ title: '', content: '' })
 */
export const wMessageConfirm = (options, confirmCb, cancelCb) => {
  ElMessageBox.confirm(options.content, options.title, {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: options.cancelButtonText || '取消',
    type: options.type || 'warning'
  })
    .then(() => {
      if (confirmCb) confirmCb()
    })
    .catch(() => {
      if (cancelCb) cancelCb()
    })
}

/**
 * 消息弹窗，常用于错误信息展示等，无需触发接口
 * @param {object} options 消息内容
 * @param {func} confirmCb 点击确认按钮的回调函数
 * wMessageConfirm({ title: '', content: '' })
 */
export const wMessageAlert = ({ content, title, type = 'info' }, cb) => {
  ElMessageBox.alert(content, title, {
    type,
    showCancelButton: false,
    showConfirmButton: cb ? true : false,
    callback: () => {
      cb && cb()
    }
  })
}

/**
 * 消息提交弹窗
 * @param {object} options 消息内容
 * @param {func} confirmCb 点击确认按钮的回调函数
 * @param {func} cancelCb 点击取消按钮的回调函数
 * wMessagePrompt({ title: '', content: '' })
 */
export const wMessagePrompt = (options, confirmCb) => {
  const { content, title, inputValue = null, inputPattern, inputErrorMessage, inputPlaceholder } = options
  ElMessageBox.prompt(content, title, {
    inputValue,
    inputPattern,
    inputErrorMessage,
    inputPlaceholder,
    beforeClose: (action, instance, done) => {
      if (action === 'cancel') {
        done()
      } else {
        confirmCb(instance.inputValue, done)
      }
    },
    callback: () => {}
  })
}
