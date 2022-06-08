<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-07-15 13:48
* Desc: index-消费分布
*/
 -->
 <style lang="scss" scoped>
.enpenses-item {
  padding: 15px;
  height: 100%;
  .enpenses-item-title {
    font-size: 14px;
    font-weight: 600;
  }
  #distributeChart2 {
    width: 100%;
    height: 250px;
  }
}
</style>

<template>
  <ui-card class="enpenses-item distribute">
    <p class="enpenses-item-title">客户分布</p>
    <div id="distributeChart2"></div>
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
  // Provide,
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
  name: "distribute",
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

  //
  // data.
  // @Provide() demo:number = 1;
  // @Prop({ type: number }) demo: number;
  // @Inject() readonly cloudProvider!: string;
  @Inject("ProvideObj") readonly ProvideObj!: any;

  getTrendParams: consumeParam = {
    cloudType: "",
    cloudAccount: "",
    productCataCode: "",
    billingPeriodStart: "",
    billingPeriodEnd: "",
    groupTypes: ["PRODUCT"],
  };
  chartData = [
    { value: 588, name: "福建" },
    { value: 159, name: "上海" },
    { value: 59, name: "北京" },
  ];
  totalAmount: number = 0;
  colorList = [
    "#4ccfe0",
    "#6798ff",
    "#e67667",
    "#ffce00",
    "#45c446",
    "#b557e4",
    "#cedb3a",
    "#027082",
    "#029688",
    "#8bc34b",
    "#f2e03a",
    "#ff9902",
    "#c90b0b",
    "#690497",
    "#a78ff1",
  ];

  dateStr = dateLibs.getTimeStr();
  myChart = null;
  timer = null;
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
    var chartDom = document.getElementById("distributeChart2");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "0%",
        left: "center",
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
      series: [
        {
          name: "分布:",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "南部" },
            { value: 735, name: "东部" },
            { value: 580, name: "西部" },
            { value: 484, name: "中部" },
            { value: 300, name: "北部" },
          ],
        },
      ],
    };
    myChart.setOption(option);
  }
  init() {}
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
    this.$nextTick(() => {
      this.echartInit();
    });
    this.$bpEventMgr.on(window, "resize", this._resizeFn);
  }
  created() {}
}
</script>
