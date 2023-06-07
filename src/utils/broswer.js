import navigatorLanguages from 'navigator-languages'
import { storage } from './storage'

/**
 * 获取默认语言
 * localStorage > broswer > 'zh'
 * zh 回退语言
 * @returns {string} 默认语言
 */
export function getDefaultLang() {
  const broswerLangs = navigatorLanguages() || ['zh']
  const broswerLang = broswerLangs[0].split('-')[0].toLowerCase()
  return storage.get('lang') || broswerLang
}

/**
 * 判断是不是IE浏览器
 */
export function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  }
  return false
}

/**
 * 判断用户是否授权chrome通知，未授权则提示用户授权
 * 注意：如果不支持NotificationAPI 或 用户不在当前页面时则不用询问用户是否授权
 */
export function checkChromePermission() {
  if (!window.Notification || document.visibilityState !== 'visible') return

  // 如果用户未授权，则提醒用户授权
  if (Notification.permission !== 'granted') {
    Notification.requestPermission()
  }
}

/**
 * chrome通知
 * @param {string} title 标题
 * @param {string} message 消息体
 * @param {string} url 需要跳转的地址
 * @param {boolean} insideHidden 在平台内部时，是否触发通知，默认不触发
 * options.dir 文本方向
 * options.body 通知内容
 * options.icon 通知icon
 * options.requireInteraction 是否自动关闭
 */
export function sendChromeMessage(title, message, url, insideHidden = true) {
  if (!window.Notification) return
  if (insideHidden && document.visibilityState === 'visible') return
  let options = {
    body: message,
    dir: 'auto',
    requireInteraction: true
  }
  if (Notification.permission === 'granted') {
    let notification = new Notification(title, options)
    notification.onclick = () => {
      if (url) {
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('style', 'display: none')
        a.setAttribute('target', '_blank')
        a.setAttribute('id', 'j_url')
        // 防止反复添加
        if (!document.getElementById('j_url')) {
          document.body.appendChild(a)
        }
        a.click()
        notification.close()
      }
    }
    setInterval(() => {
      notification.close()
    }, 2000)
  }
}
