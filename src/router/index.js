import { createRouter, createWebHistory } from 'vue-router'
import { useLoginUserStore } from '@/stores/user'

import PagesRoute from './pages'
import ConsoleRoute from './console'
import SystemRoute from './system'

import NotFound from '@/views/NotFound.vue'

/**
 * meta 参数说明
 * @param isPage {Boolean} 是否为前台页面，default: falses
 * @param ignoreLoginCheck {Boolean} 是否忽略登录校验，default: false
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...PagesRoute,
    ...ConsoleRoute,
    ...SystemRoute,
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.ignoreLoginCheck) {
    next()
    return
  }
  // 检测当前用户登录状态
  const userLoginStore = useLoginUserStore()
  if (!userLoginStore.userInfo) {
    // 调用接口判断用户是否登录
    userLoginStore.getLoginUserInfo().then(res => {
      if (res) next()
    })
  } else {
    next()
  }
})

export default router
