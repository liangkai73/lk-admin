
<!--
/**
* Copyright (c) 2017 Copyright originforest All Rights Reserved.
* Author: huangxinping
* Date: 2020/9/15
* Desc: 折线图组件
*/ 
 -->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize"; // 监听 重置图表
// import { merge } from "lodash";
import * as febs from 'febs';
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    // 监听变动
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 载入图表
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    // 设置参数/数据
    setOptions(chartData) {
      this.chart.setOption(this.getOptions(chartData), false);
    },
    // 获取配置数据 x 轴数据 Y轴数据
    getOptions({ seriesData } = {}) {
      return febs.utils.mergeMap({series: seriesData}, 
        this.extraOption);
    },
  },
};
</script>
