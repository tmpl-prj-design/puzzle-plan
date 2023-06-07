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
      options.series = formatLineData(originData, customOptions)
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
function formatLineData(originData, customOptions) {
  const { _colors, _area, _area_colors } = customOptions
  const seriesData = originData.map(({ name, data, key }) => {
    let item = {
      name,
      data,
      type: 'line',
      smooth: true,
      showSymbol: true,
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

  // 区域图需要对数据进行排序
  if (_area) seriesData.sort((a, b) => a.data.reduce((p, c) => p + c[1], 0) - b.data.reduce((p, c) => p + c[1], 0))

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
      if (typeof cItem[k] === 'object') {
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
