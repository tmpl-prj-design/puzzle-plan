<template>
  <el-drawer
    :title="title"
    :direction="direction"
    :with-header="showHeader"
    :model-value="visible"
    :append-to-body="true"
    :before-close="closeDrawer"
    :close-on-click-modal="useAssistClose"
    :close-on-press-escape="useAssistClose"
    :show-close="showClose"
    :size="drawerSize"
    :custom-class="'g-drawer-box' + (customClass ? ` ${customClass}` : '')"
  >
    <slot></slot>
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #footer>
      <span v-if="showDrawerFooter" class="drawer-footer">
        <el-button plain @click="closeDrawer">{{ cancelBtnText || $t('c_common.cancel') }}</el-button>
        <el-button type="primary" :loading="btnLoading" :disabled="btnLoading || btnDisabled" @click="submitDrawer">{{
          btnText || $t('c_common.submit')
        }}</el-button>
      </span>
    </template>
  </el-drawer>
</template>

<script setup>
/**
 * Drawer抽屉组件
 * @param {String} title - 抽屉标题
 * @param {Boolean} visible - 是否展示
 * @param {Boolean} btnLoading - 确定按钮的loading效果
 * @param {Boolean} btnDisabled - 确定按钮的disabled效果
 * @param {String} btnText - 确定按钮的文字展示，默认 '确定'
 * @param {Number} drawerWidth - 抽屉宽度，默认 420 大抽屉建议 620
 * @param {String} customClass - 抽屉内容样式，默认 'g-drawer-box'
 * @param {Boolean} useAssistClose - 是否支持 点击modal/esc关闭，默认 不支持
 * @function closeDrawer 关闭drawer的函数
 *
 */
defineProps({
  title: {
    type: String,
    default: ''
  },
  visible: Boolean,
  btnLoading: Boolean,
  btnDisabled: Boolean,
  customClass: {
    type: String,
    default: ''
  },
  direction: {
    type: String,
    default: 'rtl'
  },
  showDrawerFooter: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  btnText: {
    type: String,
    default: ''
  },
  cancelBtnText: {
    type: String,
    default: ''
  },
  drawerSize: {
    type: Number,
    default: 450
  },
  useAssistClose: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['cancelFunc', 'submitFunc'])

function closeDrawer(val) {
  emits('cancelFunc', typeof val === 'function')
}
function submitDrawer() {
  emits('submitFunc')
}
</script>
