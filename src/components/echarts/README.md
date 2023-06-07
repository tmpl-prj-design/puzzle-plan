# 图表组件
对基础图表进行封装处理。

### 1、模版引入
```html
<ChartCpt
  :custom-options="{ _title: 'Pie Chart' }"
  :chart-data="chartData"
  chart-type="pie"
/>
```
### 2、组件参数说明
- customOptions: 自定义配置（包括特殊配置，以及可直接覆盖图表的配置）
- chartType: 图表类型，必传，默认 pie。注意类型必须与配置中 series下的type 保持一致。
- chartHeight: 图表高度，默认260px，注意单位
- chartData: 图表数据

### 3、chartData 图表数据参数详细说明
#### 饼图/环图
示例：
```js
pieChartData = [
  { value: 10, name: '周一', key: '1' },
  { value: 15, name: '周二', key: '2' },
]
```
- value: 数据项的值，必传
- name: 数据项名称，必传，图表会根据name设置，自动生成legend
- key: 非必传。当使用自定义颜色等配置时，必传，需要根据key找到对应的颜色

#### 折线图
示例：
```js
lineChartData = [
  {
    name: 'line1',
    key: 'l1',
    data: [['a', 10],['b', 19],['c', 20]]
  },
  {
    name: 'line2',
    key: 'l2',
    data: [['a', 120],['b', 9],['c', 2]]
  },
  {
    name: 'line3',
    key: 'l3',
    data: [['a', 1],['b', 112],['c', 220]]
  }
]
```
- name: 数据项名称，必传，图表会根据name设置，自动生成legend
- key: 非必传。当使用自定义颜色等配置时，必传，需要根据key找到对应的颜色
- data: 数据项值，必传。二维数组组成，第一个值为横坐标，第二个值为纵坐标值


### customOptions 图表自定义配置详细说明
自定义配置分两种类型：
- 下划线开头的特殊配置，如_title _colors等
- 图表常规配置，如在原始配置的基础上微调，更改文字大小等

示例：
```js
customOptions={
  // 特殊配置
  _title: 'Pie Chart', 
  _colors: { a: 'red', b: 'yellow', c: 'blue', d: 'black' }

  // 常规配置
  legend: {
    data: ['a', 'b', 'c']
  }
}
```

#### 特殊配置
- _title: 图表标题
- _colors: 图表数据项自定义颜色，需配合数据中的key使用。如：```_colors = { a: 'red', b: 'yellow', c: 'blue', d: 'black' }```
- _area: 【折线图】是否使用区域
- _area_colors: 【折线图】区域自定义颜色，格式参考_colors


#### 饼图/环图
示例：
```js
pieChartData = [
  { value: 10, name: '周一', key: '1' },
  { value: 15, name: '周二', key: '2' },
]
```
- value: 数据项的值，必传
- name: 数据项名称，必传，图表会根据name设置，自动生成legend
- key: 非必传。当使用自定义颜色等配置时，必传，需要根据key找到对应的颜色

#### 折线图
示例：
```js
lineChartData = [
  {
    name: 'line1',
    key: 'l1',
    data: [['a', 10],['b', 19],['c', 20]]
  },
  {
    name: 'line2',
    key: 'l2',
    data: [['a', 120],['b', 9],['c', 2]]
  },
  {
    name: 'line3',
    key: 'l3',
    data: [['a', 1],['b', 112],['c', 220]]
  }
]
```
- name: 数据项名称，必传，图表会根据name设置，自动生成legend
- key: 非必传。当使用自定义颜色等配置时，必传，需要根据key找到对应的颜色
- data: 数据项值，必传。二维数组组成，第一个值为横坐标，第二个值为纵坐标值

