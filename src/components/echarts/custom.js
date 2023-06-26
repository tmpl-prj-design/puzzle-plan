import { timeUnitFormat } from '@/utils/format'

/**
 * 通用配置
 * legend: 一般情况下data无需设置，根据series中的数据自动生成。如需固定legend，可通过customOptions指定
 */
const Colors = [
  '#273efa',
  '#409eff',
  '#5ad8a6',
  '#fe9c01',
  '#febf01',
  '#fedd01',
  '#ffec3d',
  '#ff7875',
  '#ff9c6e',
  '#ffbb96',
  '#d9f7be',
  '#b7eb8f',
  '#95de64',
  '#d3adf7',
  '#b37feb'
]
const commonOptions = {
  color: Colors,
  title: {
    show: false,
    textAlign: 'center',
    textVerticalAlign: 'center',
    left: '50%',
    top: '22%',
    itemGap: 0,
    padding: 0,
    textStyle: {
      color: '#191A1B',
      fontSize: 20
    },
    subtextStyle: {
      color: '#606266',
      fontSize: 14
    }
  },
  legend: {
    type: 'scroll',
    itemGap: 16,
    top: 0,
    right: 5,
    width: '80%',
    icon: 'circle',
    itemHeight: 6,
    itemWidth: 6,
    textStyle: {
      color: '#606266',
      fontSize: 11,
      lineHeight: 14
    },
    pageIconSize: 10
  }
}

// 常规饼图、环图 配置
const pie = () => {
  return {
    ...commonOptions,
    series: {
      type: 'pie',
      radius: '60%',
      center: ['50%', '60%'],
      minAngle: 5,
      startAngle: 90,
      label: {
        formatter: '{d}' + '%',
        color: '#303133',
        fontSize: 10
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.2)'
        }
      },
      emphasis: {
        scaleSize: 6,
        itemStyle: {
          shadowColor: 'rgba(186,189,192,1)',
          shadowBlur: 11,
          shadowOffsetX: 1,
          shadowOffsetY: 1
        }
      },
      data: [] // 格式说明：[{ value: '', name: '' }]
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#303133',
      formatter: params => {
        return `<div style="display: flex; align-items: center; font-size: 12px; color: #fff;">${params.marker}<span>${params.name}: ${params.value} (${params.percent}%)</span></div>`
      },
      borderWidth: 0,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      }
    }
  }
}

// 常规折线图、堆叠折线图配置
const line = options => {
  const { tooltipFormatType } = options || {}
  return {
    ...commonOptions,
    animation: false,
    grid: {
      left: '1%',
      right: '1%',
      bottom: 10,
      top: 46,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#303133',
      formatter: params => {
        return customTooltip(params, tooltipFormatType)
      },
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      nameGap: 5,
      nameTextStyle: {
        color: '#666',
        width: 30,
        fontSize: 10,
        overflow: 'truncate'
      },
      boundaryGap: false,
      axisLabel: {
        color: '#606266',
        fontSize: 10,
        lineHeight: 16,
        hideOverlap: true
      },
      axisLine: {
        lineStyle: {
          color: '#cfd3d9'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#666',
        fontSize: 10
      },
      axisLabel: {
        color: '#606266',
        fontSize: 10,
        lineHeight: 16,
        formatter: value => {
          return getFormatValue(value, 'yAxisNumber')
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#cfd3d9',
          type: 'dashed'
        }
      }
    },
    series: []
  }
}

// 常规柱状图、堆叠柱状图配置
const bar = options => {
  const { tooltipFormatType } = options || {}
  return {
    ...commonOptions,
    grid: {
      left: '1%',
      right: '1%',
      bottom: 10,
      top: 40,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#303133',
      formatter: params => {
        return customTooltip(params, tooltipFormatType)
      },
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'category',
      nameTextStyle: {
        color: '#666',
        width: 30,
        fontSize: 10,
        overflow: 'truncate'
      },
      axisLabel: {
        width: 100,
        color: '#606266',
        fontSize: 10,
        lineHeight: 16,
        overflow: 'break'
      },
      axisLine: {
        lineStyle: {
          color: '#cfd3d9'
        }
      },
      axisTick: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#666',
        fontSize: 10
      },
      axisLabel: {
        color: '#606266',
        fontSize: 10,
        lineHeight: 16
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#cfd3d9'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#cfd3d9',
          type: 'dashed'
        }
      }
    },
    series: []
  }
}

// 图表配置项
export const ChartOptions = {
  pie,
  line,
  bar
}

// 自定义tooltip
function customTooltip(params, tooltipFormatType) {
  const title = params[0].axisValue
  let str = `<div style="color: #fff;">${title}</div>`

  params.forEach(item => {
    const value = item.value[item.value.length - 1]
    str += `<div style="display: flex; align-items: center; font-size: 12px; color: #fff; padding-top: 4px;">${
      item.marker
    }<span style="flex: 1; padding-right: 12px;">${item.seriesName}</span><span>${getFormatValue(value, tooltipFormatType)}</span></div>`
  })

  return str
}

// 格式化函数
function getFormatValue(y, type) {
  switch (type) {
    case 'yAxisNumber':
      if (y < 10000) {
        return y.toString().replace(/\d+/, n => n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
      } else {
        return y < 100000000 ? y / 10000 + 'w' : y / 100000000 + 'y'
      }
    case 'usedTime':
      return y < 1000 ? y + 'ms' : timeUnitFormat(y / 1000)
    default:
      return y.toString().replace(/\d+/, n => n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
  }
}
