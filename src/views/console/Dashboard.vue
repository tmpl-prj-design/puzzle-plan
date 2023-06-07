<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <ChartCpt
        :custom-options="{ _title: 'Pie Chart', _colors: { a: 'red', b: 'yellow', c: 'blue', d: 'black' } }"
        :chart-data="test"
        chart-type="pie"
      />
    </el-col>
    <el-col :span="8">
      <ChartCpt
        :custom-options="{
          _title: 'Pie Chart',
          series: {
            radius: '50%',
            itemStyle: {
              borderRadius: 10
            }
          }
        }"
        :chart-data="test"
        chart-type="pie"
      />
    </el-col>
    <el-col :span="8">
      <ChartCpt
        :custom-options="{ _title: 'Pie Chart' }"
        :chart-data="[
          { value: 10, name: '周一' },
          { value: 15, name: '周二' }
        ]"
        chart-type="pie"
      />
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <ChartCpt
        :custom-options="{ _title: 'Line Chart', xAxis: { name: 'x name' }, yAxis: { name: 'y name' } }"
        :chart-data="testLine"
        chart-type="line"
      />
    </el-col>
    <el-col :span="12">
      <ChartCpt
        :custom-options="{
          _title: 'Line Chart',
          _area: true,
          xAxis: { name: 'x name', nameTextStyle: { color: 'red' } },
          yAxis: { name: 'y name' }
        }"
        :chart-data="testLine"
        chart-type="line"
      />
    </el-col>
  </el-row>
</template>
<script setup>
import ChartCpt from '@/components/echarts/ChartCpt.vue'
const test = [
  { value: 10, name: '周一' },
  { value: 15, name: '周二' },
  { value: 25, name: '周三' },
  { value: 1, name: '周四' },
  { value: 15, name: '周五' },
  { value: 25, name: '周六' },
  { value: 1, name: '周日' },
  { value: 15, name: '周五-' },
  { value: 25, name: '周六-' },
  { value: 1, name: '周日-' }
]
const testLine = [
  {
    name: 'line1',
    key: 'l1',
    data: [
      ['a', 10],
      ['b', 19],
      ['c', 20]
    ]
  },
  {
    name: 'line3',
    key: 'l1',
    data: [
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ]
  },
  {
    name: 'line2',
    key: 'l2',
    data: [
      ['a', 130],
      ['b', 5],
      ['c', 80]
    ]
  }
]
</script>
