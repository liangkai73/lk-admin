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
  #distributeChart1 {
    width: 100%;
    height: 230px;
  }
}
</style>

<template>
  <ui-card class="enpenses-item distribute">
    <p class="enpenses-item-title">登录地区分布</p>
    <div id="distributeChart1" class="mt10"></div>
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
    let chartDom: any = document.getElementById("distributeChart1");
    this.myChart = echarts.init(chartDom);
    let option: any = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {d}%",
        backgroundColor: "#1f2b37",
        borderColor: "#1f2b37",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
        },
      },
      color: this.colorList,
      legend: {
        bottom: "0",
        // top: "center",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10,
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     restore: {},
      //     saveAsImage: {},
      //   },
      // },
      series: [
        {
          name: $i18n("console.overview.components.distribute.消费分布:"),
          type: "pie",
          left: "5%",
          width: "90%",
          top: "-10%",
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
              fontSize: "16",
              // formatter: "￥{c}",
              color: "#000",
              fontWeight: "bold",
            },
          },
          data: this.chartData,
        },
      ],
    };
    this.myChart.on("mouseout", "series", () => {
      option.title.show = true;
      this.myChart.setOption(option);
    });
    this.myChart.on("mouseover", "series", (ctx) => {
      option.title.show = false;
      this.myChart.setOption(option);
    });
    this.myChart.setOption(option);
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
