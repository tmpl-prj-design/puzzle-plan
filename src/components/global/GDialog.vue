<template>
  <el-dialog
    :title="title"
    :model-value="visible"
    :append-to-body="true"
    :before-close="closeDialog"
    :close-on-click-modal="useAssistClose"
    :close-on-press-escape="useAssistClose"
    :show-close="showClose"
    :width="dialogWidth"
    :custom-class="'g-dialog-box' + (customClass ? ` ${customClass}` : '')"
  >
    <slot></slot>
    <template #footer>
      <span v-if="showDialogFooter" class="dialog-footer">
        <el-button plain @click="closeDialog">{{ cancelBtnText || $t('c_common.cancel') }}</el-button>
        <el-button type="primary" :loading="btnLoading" :disabled="btnLoading || btnDisabled" @click="submitDialog">{{
          btnText || $t('c_common.submit')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
/**
 * Dialog弹窗组件
 * @param {String} title - 弹窗标题
 * @param {Boolean} visible - 是否展示
 * @param {Boolean} btnLoading - 确定按钮的loading效果
 * @param {Boolean} btnDisabled - 确定按钮的disabled效果
 * @param {String} btnText - 确定按钮的文字展示
 * @param {String} dialogWidth - 弹窗宽度，默认 '420px' 大弹窗建议 620px
 * @param {String} customClass - 弹窗内容样式，默认 'g-dialog-box'
 * @param {Boolean} useAssistClose - 是否支持 点击modal/esc关闭，默认 不支持
 * @function closeDialog 关闭dialog的函数
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
  showDialogFooter: {
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
  dialogWidth: {
    type: String,
    default: '420px'
  },
  useAssistClose: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['cancelFunc', 'submitFunc'])

function closeDialog(val) {
  emits('cancelFunc', typeof val === 'function')
}
function submitDialog() {
  emits('submitFunc')
}
</script>
