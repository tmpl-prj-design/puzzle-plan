<template>
  <ElementIcon v-if="ElementIcon" :style="iconStyle" />
  <svg v-else class="g-icon" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="'#' + type"></use>
  </svg>
</template>

<script setup>
/**
 * GIcon 组件
 * @description icon组件，支持两种形式：使用symbol类型的iconfont库; element-plus icons
 * @param type {String} icon名称
 * @param size {Number} icon大小 默认16
 * @example <g-icon :type="ca-type"/>
 * */
import { computed } from 'vue'
import * as ElementPlusIconsVue from './element_icon.js'

const props = defineProps({
  type: {
    required: true,
    type: String
  },
  size: {
    type: Number,
    default: 16
  }
})

// 相对顶级fontsize[12px]计算rem
const iconStyle = computed(() => {
  const proportion = ((1 * props.size) / 12).toFixed(2)
  return {
    width: proportion + 'rem',
    height: proportion + 'rem'
  }
})

// 获取 element icon
const ElementIcon = ElementPlusIconsVue[props.type]
</script>

<style scoped lang="scss">
.g-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}
</style>
