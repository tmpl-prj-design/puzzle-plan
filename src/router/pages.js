/**
 * pages.js
 * 页面路由，产品首页、介绍、关于等等页面
 */

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/pages/HomeView.vue'),
    meta: { isPage: true }
  }
]
