<template>
  <el-container class="p-container">
    <el-header class="p-header-box">
      <div class="p-header-content">
        <div class="logo-box"></div>
        <div class="right-box">
          <RouterLink class="btn" to="/console">{{ $t('c_menu.console') }}</RouterLink>
          <div class="btn" @click="changeLang()">{{ $t('c_menu.lang') }}</div>
        </div>
      </div>
    </el-header>
    <el-main class="p-main-box">
      <div class="content-box">
        <h2>Welcome to Your Puzzle App</h2>
        <div class="description">
          项目基于vue3.0 + element-plus + vite创建，预设网络请求、路由、状态管理等基础配置，预设国际化等场景，内置多种常见方法。点击<a
            ref="reference"
            href="https://u4ufqtoexx.feishu.cn/docx/GkvMdzNmyoKx0rxwOYxcs3TLn6f"
            target="_blank"
            >这里</a
          >阅读详细文档。
        </div>
        <img src="../../assets/images/menu.png" width="700" />
      </div>
    </el-main>
    <el-footer class="p-footer-box" height="30px">@copyright xxx</el-footer>
  </el-container>
</template>
<script setup>
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n'

// 语言设定
const i18n = useI18n()
const langStore = useLangStore()
function changeLang() {
  const curLang = langStore.lang === 'en' ? 'zh' : 'en'
  i18n.locale.value = curLang
  langStore.setLang(curLang)
}
</script>

<style scoped lang="scss">
.p-container {
  height: 100%;
}
.p-header-box {
  background-color: #fff;
  box-shadow: 0 0px 2px #adabab;
  z-index: 100;
  & .p-header-content {
    width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }
  & .logo-box {
    width: 200px;
    height: 60px;
    padding-left: 52px;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 2px;
    background: url('../../assets/images/logo.png') left center / auto 48px no-repeat;
  }
  & .right-box {
    display: flex;
    align-items: center;
  }
  & .btn {
    cursor: pointer;
    margin-left: 20px;
    color: #333;
    text-decoration: none;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
.p-main-box {
  & .content-box {
    margin: 20px auto;
    max-width: 1100px;
  }
  & .description {
    font-size: 14px;
    padding: 20px 0;
  }
}
.p-main-box a {
  padding: 0 4px;
  color: var(--el-color-primary);
}
.p-footer-box {
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background: #575757;
}
</style>
