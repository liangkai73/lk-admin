xiaofeiqushi<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-07-15 13:48
* Desc: index-消费趋势
*/
 -->
 <style lang="scss" scoped>
.enpenses-item {
  height: 100%;
  .enpenses-item-title {
    font-size: 14px;
    font-weight: 600;
  }
  #trendChart2 {
    width: 100%;
    height: 250px;
  }
}
</style>

<template>
  <ui-card class="enpenses-item trend-item">
    <p class="enpenses-item-title">芯片消耗</p>
    <div id="trendChart2"></div>
  </ui-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  Provide,
  Inject,

  // Emit,
} from "vue-property-decorator";
import * as echarts from "echarts";
import dateLibs from "./dateLibs";
import api from "@/api";
import * as febs from "febs";

interface consumeParam {
  cloudType?: string;
  cloudAccount?: string;
  productCataCode?: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  groupTypes: any[];
}
@Component({
  components: {},
  name: "trend",
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
  // @Prop({ type: number }) demo: number;
  // @Inject() readonly cloudProvider!: string;
  @Inject() readonly ProvideObj!: any;

  getTrendParams: consumeParam = {
    cloudType: "",
    cloudAccount: "",
    productCataCode: "",
    billingPeriodStart: "",
    billingPeriodEnd: "",
    groupTypes: ["CLOUD"],
  };
  //
  // data.
  // @Provide() demo:number = 1;
  chartData = [
    ["product", "ECS", "弹性容器", "Nat", "负载均衡"],
    ["1月", 433, 858, 937, 600],
    ["2月", 831, 734, 551, 300],
    ["3月", 864, 652, 825, 660],
    ["4月", 724, 539, 391, 452],
  ];
  colorList = [
    "#64b5f6",
    "#4fc3f7",
    "#80d6ff",
    "#4dd0e1",
    "#4db6ac",
    "#81c784",
    "#aed581",
    "#dce775",
    "#fff176",
    "#ffd54f",
    "#ffb74d",
    "#ff8a65",
    "#e57373",
    "#f06292",
    "#9575cd",
  ];
  myChart = null;
  timer = null;
  showNodata: boolean = false;
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
  echartInit() {
    var chartDom = document.getElementById("trendChart2");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      color: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      legend: {
        data: ["枝晓大红袍", "国金号普洱", "安宫特别版", "中药熬制", "熊胆粉"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "枝晓大红袍",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "国金号普洱",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "安宫特别版",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "中药熬制",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "熊胆粉",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    myChart.setOption(option);
  }

  init() {}
  created() {
    // this.init();
    this.$nextTick(() => {
      this.echartInit();
    });
  }
  _resizeFn() {
    if (this.timer) {
      this.$timer.clearTimeout(this.timer);
    }
    this.timer = this.$timer.setTimeout(() => {
      this.myChart.resize();
      this.timer = null;
    }, 500);
  }

  beforeDestroy() {}

  mounted() {
    // this.$bpEventMgr.on(window, "resize", this._resizeFn);
  }
}
</script>
