import { isPlainObject, uniq } from 'lodash-es'
/**
 * 格式化数据方法
 * @param {string} type 可选：pie line bar等。根据series中的类型而定
 * @param {array} originData 图表原始数据
 * @param {object} options 图表配置
 * @param {object} customOptions 图表自定义配置
 */

export function formatData(type, originData, options, customOptions) {
  switch (type) {
    case 'pie':
      options.series.data = formatPieData(originData, customOptions)
      break
    case 'line':
      options.series = formatLineData(originData, customOptions, options)
      break
    case 'bar':
      options.series = formatBarData(originData, customOptions, options)
      break
  }
}
// 格式化饼图数据
function formatPieData(originData, customOptions) {
  const { _colors } = customOptions
  return originData.map(({ name, value, key }) => {
    const item = {
      name,
      value
    }
    if (_colors) item.itemStyle = { color: _colors[key] }
    return item
  })
}

// 格式化折线图数据
function formatLineData(originData, customOptions, options) {
  const { _colors, _area, _area_colors, _xAxisType = 'time' } = customOptions
  const seriesData = originData.map(({ name, data, key }) => {
    // 数据排序
    if (_xAxisType && _xAxisType === 'time') {
      data.sort((a, b) => new Date(a[0]).valueOf() - new Date(b[0]).valueOf())
    }

    let item = {
      name,
      data,
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1.6
      }
    }
    // 指定颜色
    if (_colors) item.color = _colors[key]

    //  区域图
    if (_area) {
      item = {
        ...item,
        stack: 'Total',
        areaStyle: {
          opacity: 0.25
        },
        emphasis: {
          focus: 'series'
        }
      }
      if (_area_colors) item.areaStyle.color = _area_colors[key]
    }

    return item
  })

  // 处理类目轴，x轴label展示
  if (options.xAxis.type === 'category') {
    let xAxisData = []
    originData.forEach(({ data }) => {
      xAxisData = xAxisData.concat(data.map(i => i[0]))
    })
    xAxisData = uniq(xAxisData) // 去重
    if (_xAxisType && _xAxisType === 'time') {
      // 时间排序
      xAxisData.sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf())
    }
    xAxisData = xAxisData.map(i => {
      return {
        value: i,
        textStyle: {
          align: i === 0 ? 'left' : i === xAxisData.length - 1 ? 'right' : 'center'
        }
      }
    })
    options.xAxis.axisLabel.showMinLabel = xAxisData.length <= 3
    options.xAxis.axisLabel.showMaxLabel = xAxisData.length <= 3

    options.xAxis.data = xAxisData
  }

  // 区域图需要对数据进行排序
  if (_area) seriesData.sort((a, b) => a.data.reduce((p, c) => p + c[1], 0) - b.data.reduce((p, c) => p + c[1], 0))

  return seriesData
}

// 格式化柱状图数据
function formatBarData(originData, customOptions) {
  const { _colors, _stacked } = customOptions
  const seriesData = originData.map(({ name, data, key }) => {
    let item = {
      name,
      data,
      type: 'bar',
      barMaxWidth: 40,
      label: {
        show: true,
        color: '#fff',
        fontSize: 10
      }
    }
    // 指定颜色
    if (_colors) item.color = _colors[key]

    //  堆叠图
    if (_stacked) {
      item = {
        ...item,
        stack: 'Total',
        emphasis: {
          focus: 'series'
        }
      }
    }
    return item
  })

  // 堆叠图需要对数据进行排序
  if (_stacked) seriesData.sort((a, b) => b.data.reduce((p, c) => p + c[2], 0) - a.data.reduce((p, c) => p + c[2], 0))

  return seriesData
}

/**
 * 格式化配置
 * @param {string} type 可选：pie line bar等。根据series中的类型而定
 * @param {object} options 图表配置
 * @param {object} customOptions 图表自定义配置
 * 注意参数修改需要递归
 */
export function formatOptions(type, customOptions, options) {
  const formatFunc = (cItem, oItem) => {
    Object.keys(cItem).forEach(k => {
      if (isPlainObject(cItem[k])) {
        formatFunc(cItem[k], oItem[k])
      } else {
        oItem[k] = cItem[k]
      }
    })
  }
  Object.keys(customOptions).forEach(k => {
    if (k.indexOf('_') === 0) return
    formatFunc(customOptions[k], options[k])
  })
}
