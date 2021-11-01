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
  import default_option from "./default_option"; // 默认配置
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
      brush: {
        type: Boolean,
        default: true,
      },
      smooth: {
        type: Boolean,
        default: false,
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
        console.debug(this.chartData)
        this.setOptions(this.chartData);
      },
      // 设置参数/数据
      setOptions(chartData) {
        this.chart.setOption(this.getOptions(chartData), false);
      },
      // 获取配置数据 x 轴数据 Y轴数据
      getOptions({
        xAxisData,
        seriesData
      } = {}) {
        // 数据格式化
        let toolbox = {
          show: this.brush,
        };
        // 图例
        let legends = seriesData.map((item) => {
          return item.name;
        });

        let options = febs.utils.mergeMap(
          default_option, {
            toolbox: toolbox,
            legend: {
              data: legends,
            },
          },
          this.extraOption
        );
        // 防止循环重复添加数据
        // options.legend.data = legends;
        let seriesDatas = {
          type: 'pie',
          selectedMode: false,
          animation: false,
          silent: true,
          radius: ['45%', '60%'],
          label: {show: false},
          labelLine: {show: false},
          avoidLabelOverlap: false,
          data: seriesData,
        };
        options.series = [seriesDatas];
        seriesDatas.emphasis = {
          scale: false,
          scaleSize: 1,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          }
        };
        return options;
      },
    },
  };
</script>
