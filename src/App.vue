<template>
  <el-config-provider :locale="ElementLangs[langStore.lang]">
    <router-view v-if="isActiveRouter" />
  </el-config-provider>
</template>
<script setup>
import { ref, nextTick, watch } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { ElementLangs } from '@/intl/lang'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

// 当语言切换时，重置组件
const i18n = useI18n()
watch(i18n.locale, (n, o) => {
  if (n !== o) reload()
})

const isActiveRouter = ref(true)
function reload() {
  isActiveRouter.value = false
  nextTick(() => {
    isActiveRouter.value = true
  })
}
</script>
