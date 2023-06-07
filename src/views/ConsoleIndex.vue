<template>
  <el-container class="c-container">
    <el-aside class="c-aside-box" width="200px">
      <el-menu router>
        <el-menu-item index="console" :route="{ path: '/console' }">Dashboard</el-menu-item>
        <el-menu-item index="other" :route="{ path: '/console/other' }">Other</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="c-header-box">
        <RouterLink to="/">Back Home</RouterLink>
        <div>
          <span style="padding-right: 20px">{{ userLoginStore.userInfo && userLoginStore.userInfo.name }}</span>
          <RouterLink v-if="!userLoginStore.userInfo" to="/login">登录</RouterLink>
          <span v-else>退出登录</span>
        </div>
      </el-header>
      <el-main class="c-main-box"><RouterView /></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { useLoginUserStore } from '@/stores/user'

const userLoginStore = useLoginUserStore()
</script>
<style scoped lang="scss">
.c-container {
  height: 100%;
}
.c-aside-box {
  border-right: 1px solid #8d8d8d;
}
.c-header-box {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  border-bottom: 1px solid #8d8d8d;
  & a {
    color: #333;
    text-decoration: none;
  }
}
</style>
