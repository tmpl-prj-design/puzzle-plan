/**
 * system.js
 * 系统路由，登录、注册、系统设置、个人中心、消息中心等页面
 */

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/LoginPage.vue')
  }
]
