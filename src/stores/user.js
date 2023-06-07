import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 当前登录用户信息存储
 * @example
 * import { useLoginUserStore } from '@/stores/lang'
 * const userStore = useLoginUserStore()
 *
 * // 展示当前用户信息
 * console.log(userStore && userStore.name)
 * 
 * // 更新用户信息
 * userStore.getLoginUserInfo().then(res => {
      if (res) next()
    })
 *
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  const userInfo = ref(null)
  function setUserInfo(info) {
    userInfo.value = info
  }
  // 异步获取数据
  function getLoginUserInfo() {
    return new Promise(resolve => {
      // demo
      setTimeout(() => {
        const data = {
          name: 'J'
        }
        resolve(data)
        setUserInfo(data)
      }, 1000)

      // getLoginUserAPI().then(res => {
      //   if (res && res.code === 200) {
      //     setUserInfo(res.data)
      //     resolve(res.data)
      //   } else {
      //     reject(res.mesage)
      //   }
      // })
    })
  }
  return { userInfo, setUserInfo, getLoginUserInfo }
})
