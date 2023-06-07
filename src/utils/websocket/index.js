import WebSocketIO from './io'

/**
 * websocket
 * 具体使用：
 * ws.on('open', () => {}) 监听websocket是否已经链接
 * ws.write(key, value) 发送数据到指定通道
 * ws.on(key, () => {}) 监听指定通道的数据
 * ws.close() 关闭通知
 * ws.start() 启动通知
 */

const url = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`

// if (process.env.NODE_ENV !== 'production') {
//   url = devUrl
// }

export let ws = new WebSocketIO(url, [], {
  debug: process.env.NODE_ENV !== 'production',
  automaticOpen: false
})

export function wsRetryOpen() {
  ws.restart({ url: url })
}

// Demo
// ws.on(key, res => {
// })
