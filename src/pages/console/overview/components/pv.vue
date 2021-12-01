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
  #trendChart1 {
    width: 100%;
    height: 250px;
  }
}
</style>

<template>
  <ui-card class="enpenses-item trend-item">
    <p class="enpenses-item-title">pv曲线</p>
    <div id="trendChart1"></div>
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
    let chartDom = document.getElementById("trendChart1");
    console.log(chartDom);
    let myChart = echarts.init(chartDom);
    console.log(myChart);
    let base = +new Date(2021, 11, 30);
    let oneDay = 24 * 3600 * 1000;

    let data = [[base, Math.random() * 300]];

    for (let i = 1; i < 100; i++) {
      let now = new Date((base += oneDay));
      data.push([
        +now,
        Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
      ]);
    }
    console.log(data);

    let option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        text: "pv/uv曲线",
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 20,
        },
        {
          start: 0,
          end: 20,
        },
      ],
      series: [
        {
          name: "pv",
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {},
          data: data,
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
