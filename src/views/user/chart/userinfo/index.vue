<!--
  Description：
  @date：2024-03-27 0:15
  @author：JokerWang
-->

<template>
  <div ref="chartRef" style="margin-left: 60px;width: 90%;height: 400px;background-color: white"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
let chartRef = ref<HTMLElement>();
let echartRank = ref();
onMounted(() =>{
  echartRank.value = echarts.init(chartRef.value);
  const option = {
    title: {
      text: '每日解题数量'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Web', 'Crypto', 'PWN', 'RE', 'MISC']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Web',
        type: 'line',
        data: [1, 2, 1, 1, 1, 2, 1]
      },
      {
        name: 'Crypto',
        type: 'line',
        data: [2, 1, 2, 1, 2, 1, 2]
      },
      {
        name: 'PWN',
        type: 'line',
        data: [1, 2, 3, 1, 1, 0, 1]
      },
      {
        name: 'RE',
        type: 'line',
        data: [1, 4, 2, 0, 1, 2, 1]
      },
      {
        name: 'MISC',
        type: 'line',
        data: [0, 1, 1, 3, 4, 1, 1]
      }
    ]
  };
  echartRank.value.setOption(option);
})

</script>

<style scoped>

</style>