/**
 * console.js
 * 控制中心路由，后台相关等页面
 */

export default [
  {
    path: '/console',
    component: () => import('@/views/ConsoleIndex.vue'),
    children: ConsoleChildren()
  }
]

// 子路由
function ConsoleChildren() {
  return [
    {
      path: '',
      name: 'console',
      component: () => import('@/views/console/Dashboard.vue')
    },
    {
      path: 'other',
      name: 'consoleOther',
      component: () => import('@/views/console/Other.vue')
    }
  ]
}
