<template>
  <div class="chart-box" :style="{ height: chartHeight }">
    <div v-if="customOptions._title" class="chart-title">{{ customOptions._title }}</div>
    <div v-if="chartData.length > 0" ref="echartsRef" class="chart-content"></div>
    <div v-else class="noData"><span>暂无数据</span></div>
  </div>
</template>
<script setup>
import { watch, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'
import { cloneDeep } from 'lodash-es'

import { ChartOptions } from './custom'
import { formatData, formatOptions } from './utils'

const erd = elementResizeDetectorMaker()

const props = defineProps({
  // 自定义配置
  customOptions: {
    type: Object,
    default: () => ({})
  },
  chartType: {
    required: true,
    type: String,
    default: 'pie' // 必填 pie line bar 等
  },
  // 图表数据，详细说明查看 formatData
  chartData: {
    type: Array,
    default: () => []
  },
  chartHeight: {
    type: String,
    default: '260px' //注意单位
  }
})

// 监听数据变化，绘制图表。ps: 当数据未发生变化时，不触发重绘
watch(
  () => props.chartData,
  (nData, oData) => {
    if (JSON.stringify(nData) === JSON.stringify(oData)) return

    nextTick(() => {
      if (nData.length > 0) {
        drawChart(nData)
      }
    })
  },
  { deep: true, immediate: true }
)

// 绘制
const echartsRef = ref()
let eChartInstance = null
function drawChart(data) {
  if (!eChartInstance) eChartInstance = echarts.init(echartsRef.value, 'puzzleTheme')
  // width resize
  erd.listenTo(echartsRef.value, () => {
    eChartInstance.resize()
  })

  // 图表配置项目
  const options = cloneDeep(ChartOptions[props.chartType])

  // 获取上一次选中的legend
  const { legend: legendOptipns } = eChartInstance.getOption() || { legend: [] }
  let legendSelected = {}
  if (legendOptipns && legendOptipns.length > 0) {
    legendSelected = legendOptipns[0].selected
  }
  options.legend.selected = legendSelected

  // 自定义配置
  formatOptions(props.chartType, props.customOptions, options)

  // 格式化数据
  formatData(props.chartType, data, options, props.customOptions)

  // 绘图
  eChartInstance.clear()
  eChartInstance.setOption(options)
}
</script>
<style scoped lang="scss">
.chart-box {
  position: relative;
  background: #fff;
  // test
  margin-bottom: 20px;
}
.chart-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 16px;
  font-size: 18px;
  color: #303133;
  line-height: 16px;
  font-weight: 500;
  z-index: 100;
}
.chart-content {
  width: 100%;
  height: 100%;
}
.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    padding: 20px 0 20px 48px;
    line-height: normal;
    color: #909399;
    font-size: 12px;
    background: url('../../assets/images/status/chart-nodata.png') left center / 40px 40px no-repeat;
  }
}
</style>
