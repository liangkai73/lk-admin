<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:47
* Desc: 应用详情 监控
*/
 -->
<style lang='scss' scoped>
#chart1 {
  width: 100%;
  height: 400px;
}
#chart2 {
  width: 100%;
  height: 400px;
}
</style>

<template>
  <div>
    <ui-card>
      <h3>CPU</h3>
      <div id="chart1"></div>
    </ui-card>
    <ui-card class="mt20">
      <h3>{{ $i18n('productCenter.detail.components.appWatch.内存') }}</h3>
      <div id="chart2"></div>
    </ui-card>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import api from "@/api";
import * as echarts from "echarts";
import filter from "@/libs/filter";

@Component({
  components: {},
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  @Prop({ default: "" }) appId!: string;

  //
  // data.
  // @Provide() demo:number = 1;
  timerOptions = {
    app: "",
    startTime: NaN,
    endTime: NaN,
    interval: "",
  };

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.

  constructor() {
    super();
  }
  // 初始化时间配置参数
  _initOptions() {
    this.timerOptions.app = this.appId;
    this.timerOptions.endTime = new Date().getTime();
    this.timerOptions.startTime =
      this.timerOptions.endTime - 24 * 60 * 60 * 1000;
    this.timerOptions.interval = "30m";
  }
  // 获取CPU列表
  _getCupList(options: object) {
    api.ars.ars.cpu(options).then((result: any) => {
      var myChart = echarts.init((document.getElementById as any)("chart1"));
      // 绘制图表
      let option = {
        // title: {
        //   text: "ECharts 入门示例",
        // },
        tooltip: {},
        xAxis: {
          boundaryGap: false,
          data: [],
        },

        yAxis: {
          axisLabel: {
            formatter: "{value} %",
          },
          color: ["#61a0a8"],
        },
        series: [
          {
            name: "CUP",
            type: "line",
            areaStyle: {},
            data: [],
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#4982dd",
                lineStyle: {
                  color: "#4982dd",
                },
              },
            },
          },
        ],
        // lineStyle: {
        //   color: "#3375D9",
        // },
      };
      result.forEach((item: any) => {
        (option.xAxis.data as any).push(filter.getDateStr(item.time, 1));
        (option.series[0].data as any).push((item.value * 100));
      });
      myChart.setOption(option);
    });
  }

  // 获取内存Mem列表
  _getMemList(options: object) {
    api.ars.ars.mem(options).then((result: any) => {
      var myChart = echarts.init((document.getElementById as any)("chart2"));
      // 绘制图表
      let option = {
        // title: {
        //   text: "ECharts 入门示例",
        // },
        tooltip: {},
        xAxis: {
          boundaryGap: false,
          data: [],
        },

        yAxis: {
          axisLabel: {
            formatter: "{value} MB",
          },
        },
        series: [
          {
            name: $i18n('productCenter.detail.components.appWatch.内存'),
            type: "line",
            areaStyle: {},
            data: [],
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#a352cb",
                lineStyle: {
                  color: "#a352cb",
                },
              },
            },
          },
        ],
      };
      result.forEach((item: any) => {
        (option.xAxis.data as any).push(filter.getDateStr(item.time, 1));
        (option.series[0].data as any).push(
          Math.ceil(item.value / 1024 / 1024)
        );
      });
      myChart.setOption(option);
    });
  }

  created() {
    this._initOptions();
    this._getCupList(this.timerOptions);
    this._getMemList(this.timerOptions);
  }
  mounted() {}
}
</script>
