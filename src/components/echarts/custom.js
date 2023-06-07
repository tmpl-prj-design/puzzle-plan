/**
 * 通用配置
 * legend: 一般情况下data无需设置，根据series中的数据自动生成。如需固定legend，可通过customOptions指定
 */
const commonOptions = {
  color: ['#273efa', '#409eff', '#5ad8a6', '#fe9c01', '#febf01', '#fedd01', '#ffec3d', '#ff7875', '#ff9c6e', '#ffbb96'],
  legend: {
    type: 'scroll',
    itemGap: 16,
    bottom: 8,
    width: '80%',
    icon: 'circle',
    itemHeight: 8,
    itemWidth: 8,
    textStyle: {
      color: '#999',
      fontSize: 10,
      lineHeight: 14
    },
    pageIconSize: 10
  }
}

// 常规饼图、环图 配置
const pie = {
  ...commonOptions,
  series: {
    type: 'pie',
    radius: ['35%', '60%'],
    center: ['50%', '50%'],
    minAngle: 5,
    startAngle: 90,
    itemStyle: {
      borderRadius: 6,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: false
    },
    emphasis: {
      scaleSize: 4
    },
    data: [] // 格式说明：[{ value: '', name: '' }]
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}（{d}%）',
    textStyle: {
      fontSize: 12
    }
  }
}

// 常规折线图、堆叠折线图配置
const line = {
  ...commonOptions,
  grid: {
    left: '5%',
    right: '60',
    bottom: 46,
    top: 60,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
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
        return getFormatValue(value)
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

// 图表配置项
export const ChartOptions = {
  pie,
  line
}

// 格式化函数
function getFormatValue(y, type) {
  // 普通数值类型
  if (!type) {
    let n = y / 10000 + 'w'
    if (y < 10000) {
      n = y.toString().replace(/\d+/, n => n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
    }
    return n
  } else {
    // 其他类型 字节、金额等，按需扩展
    return y
  }
}
