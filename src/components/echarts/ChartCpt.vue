<template>
  <div class="chart-box" :style="{ height: chartHeight }">
    <div v-if="customOptions._title" class="chart-title">{{ customOptions._title }}</div>
    <div v-show="chartData.length > 0" ref="echartsRef" class="chart-content"></div>
    <div v-if="chartData.length === 0" class="noData"><span>暂无数据</span></div>

    <!-- 针对 自定义legend 效果实现-->
    <div v-if="customOptions._customLegend" class="custom-legend">
      <div
        v-for="(item, idx) in chartData"
        :key="item.name"
        :class="legendSelected[item.name] ? 'selected' : ''"
        @click="customLegendActions.selected(item.name)"
        @mouseenter="customLegendActions.hoverIn(item.name)"
        @mouseleave="customLegendActions.hoverOut(item.name)"
      >
        <span :style="{ backgroundColor: ChartOptions.pie().color[idx] }" class="color-icon"></span>
        <span class="name">{{ item.name }}</span>
        <span class="percent">{{ item.percent }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref, nextTick, onBeforeUnmount, reactive } from 'vue'
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
  if (!eChartInstance) {
    eChartInstance = echarts.init(echartsRef.value)

    erd.listenTo(echartsRef.value, () => {
      eChartInstance.resize()
    })
  }

  // 图表配置项目
  const options = cloneDeep(ChartOptions[props.chartType](props.customOptions._params))

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

  // 控制legend点击，至少保留一个。最后一个legend点击取消动画；其他时候恢复，line类型除外。
  eChartInstance.on('legendselectchanged', params => {
    const option = eChartInstance.getOption()
    let selecteds = Object.values(params.selected)
    if (selecteds.every(val => !val)) {
      option.legend[0].selected[params.name] = true
      option.animation = false
    } else {
      option.animation = !(props.chartType === 'line')
    }
    eChartInstance.setOption(option)
  })
}

// 自定义 legend 方法。模拟原始效果
const legendSelected = reactive({})
const customLegendActions = {
  selected: name => {
    let selecteds = Object.values(legendSelected).filter(i => i)
    if (selecteds.length + 1 === props.chartData.length) return
    legendSelected[name] = !legendSelected[name]
    eChartInstance.dispatchAction({
      type: 'legendToggleSelect',
      name
    })
  },
  hoverIn: name => {
    eChartInstance.dispatchAction({
      type: 'highlight',
      name
    })
  },
  hoverOut: name => {
    eChartInstance.dispatchAction({
      type: 'downplay',
      name
    })
  }
}

// 销毁
onBeforeUnmount(() => {
  if (eChartInstance) {
    eChartInstance.dispose()
    eChartInstance = null
  }
})
</script>
<style scoped lang="scss">
.chart-box {
  position: relative;
}
.chart-title {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
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
  width: 100% !important;
  height: 100%;
  span {
    width: auto;
    padding: 20px 0 20px 48px;
    line-height: normal;
    color: #909399;
    font-size: 12px;
    background: url('../../assets/images/status/chart-nodata.png') left center / 40px 40px no-repeat;
  }
}

.custom-legend {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0px;
  left: 0;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-bottom: 20px;
  }
  & .selected {
    & .color-icon {
      background: #cccccc !important;
    }
    & .name & .percent {
      color: #cccccc !important;
    }
  }
  & .color-icon {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }
  & .name {
    flex: 1;
    padding: 0 2px 0 10px;
    font-size: 12px;
    color: #303133;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & .percent {
    font-size: 12px;
    font-weight: bold;
    color: #131523;
    line-height: 20px;
  }
}
</style>
