<template>
  <el-tooltip popper-class="g-ellipsis-tooltip" :disabled="!visible" effect="dark" placement="top">
    <span ref="TooltipRef" class="nowrap">{{ content }}</span>
    <template #content>
      <span class="tooltip-content">
        <slot name="custom-content">{{ content }}</slot>
      </span>
    </template>
  </el-tooltip>
</template>

<script setup>
/**
 * 超出隐藏展示tooltip组件
 * 
 * @example: 
 * 常规用法 <g-ellipsis :content="content">
 * 内容展示需要自定义格式时：
 *  <g-ellipsis :content="content">
 *    <template #custom-content>
        <div class="change-data" v-for="(key, index) in Object.keys(row.after)" :key="index">
          <span>{{ key }}:</span>
          <span>{{ row.after[key] }}</span>
        </div>
      </template>
    </g-ellipsis>
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  content: {
    type: String,
    required: true
  }
})

const visible = ref(false)
const TooltipRef = ref()

function resize() {
  visible.value = TooltipRef.value.clientWidth < TooltipRef.value.scrollWidth
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize, false)
})
</script>
<style lang="scss" scoped>
.nowrap {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  cursor: pointer;
}
</style>
