<template>
  <el-pagination
    class="g-pagination-box"
    :disabled="disabled"
    :current-page="curPageIdx"
    :page-sizes="pages"
    :page-size="pageLimit"
    :total="total"
    :background="background"
    :pager-count="pagerCount"
    :layout="layout"
    @size-change="changePage('pageLimit', $event)"
    @current-change="changePage('curPageIdx', $event)"
  >
  </el-pagination>
</template>
<script setup>
/**
 * Pagination 组件
 * @param {String} layout 分页组件需要的布局，默认'total, prev, pager, next'
 * @param {boolean} background 是否使用背景主题
 * @param {Number} total 条目总数
 * @param {Number} curPageIdx 当前页码
 * @param {Number} pagerCount 页码按钮的数量，当总页数超过该值时会折叠 默认7
 * @param {Number} pageLimit 页数量 每一页展示的数量，注意limit要在pages范围内
 * @param {Array} pages 可选择每页数量数组，默认[10, 15, 20]
 * @param {Boolean} disabled 是否不可点击，当分页组件切换会出发接口请求时，传递disabled可防止用户误操作
 * */
const emits = defineEmits(['changePage'])
defineProps({
  pages: {
    type: Array,
    default: () => {
      return [10, 20, 30]
    }
  },
  pageLimit: {
    type: Number,
    default: 10
  },
  curPageIdx: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  background: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const changePage = (type, val) => {
  emits('changePage', type, val)
}
</script>
<style scoped lang="scss">
.g-pagination-box {
  padding-top: 16px;
  text-align: right;
}
</style>
