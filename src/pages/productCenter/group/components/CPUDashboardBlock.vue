<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: brian.li
* Date: 2021-04-17 14:34
* Desc: 
*/
 -->

<template>
  <ui-card
    class="overview-body-item dashboard-block"
    :class="blockSizeTypeCssClass"
  >
    <p class="flex_r_c dashboard-block__title">
      <span class="bp-smoothing">{{ title }}</span>
      <span class="flex1"></span>
      <span class="dashboard-block__title__control" @click="onClickViewType"
        >{{ $i18n('productCenter.group.components.CPUDashboardBlock.切换') }}</span
      >
      <span class="dashboard-block__title__control" @click="onClickBlock"
        >{{ $i18n('productCenter.group.components.CPUDashboardBlock.详细') }}</span
      >
    </p>
    <ui-chart
      v-if="useRing"
      class="dashboard-block__chart"
      :chart-data="charDataRing"
      :brush="charDataRing.brush"
      :type="charDataRing.type"
      width="100%"
      height="240px"
    >
    </ui-chart>
    <ui-chart
      v-else
      class="dashboard-block__chart"
      :chart-data="chartData"
      :brush="chartData.brush"
      :type="chartData.type"
      width="100%"
      height="240px"
    ></ui-chart>

    <div
      v-if="useRing"
      class="dashboard-block__chartRing_percent"
      :title="$i18n('productCenter.group.components.CPUDashboardBlock.已经占用限制值50%')"
    >
      <p>{{ current_cpu }}</p>
      <p>%</p>
    </div>
  </ui-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Provide,
  Emit,
} from "vue-property-decorator";

import {
  DashboardBlockMixins,
  DashboardBlockSizeType,
} from "./dashboardBlockBase";

import api from "@/api";

var uiChart = require("@/components/ui/uiChart");


@Component({
  components: {
    uiChart: uiChart.default,
  },
})
export default class extends DashboardBlockMixins {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;

  //
  // Prop
  // @Prop({ type: number })
  // demo: number = 1

  //
  // data.

  // 曲线类型
  @Provide() useRing: boolean = true;

  // 曲线数据.
  @Provide() chartData: any = {
    type: "lineChart",
    unit: "cm",
    span: 8,
    xAxisData: [],
    yAxisData: {
      // min: 0,
      // max: 100,
    },
    seriesData: [
      {
        data: [],
      },
    ],
  };

  @Provide() charDataRing: any = {
    type: "pieChart",
    span: 8,
    seriesData: [
      {
        value: 0,
      },
      {
        value: 100,
      },
    ],
  };

  timer = null as any;
  current_cpu = 0;

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

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  mounted() {
    this.sizeType = DashboardBlockSizeType.size1;
    this.title = "CPU";
    this.href = "/console/overview-config";

    for (let i = 0; i <= 60; i += 5) {
      this.chartData.xAxisData.push(i);
    }

    this.getCurrentCpu();
    this.getLastCpu();

    let self = this;
    this.timer = setInterval(() => {
      self.getCurrentCpu();
      self.getLastCpu();
      // 某些定时器操作
    }, 60 * 1000);
  }

  onClickBlock() {
     this.$navbar.push({
      path: "/productCenter/cpu",
    });
  }

  onClickViewType() {
    this.useRing = !this.useRing;
  }

  getCurrentCpu() {
    api.ars.ars
      .current_cpu()
      .then((data: any) => {
        this.current_cpu = 0;

        if (data && data.length > 0) {
          this.current_cpu = data[0].value;

          this.current_cpu = (this.current_cpu * 100).toFixed(2) as any;

          this.charDataRing.seriesData = [] as any;
          this.charDataRing.seriesData.push(this.current_cpu);
          this.charDataRing.seriesData.push(100.0 - this.current_cpu);
        }
      })
      .catch((err: any) => {
        throw err;
      });
  }

  getLastCpu() {
    api.ars.ars
      .last_cpu()
      .then((data: any) => {
        let cpus = [];

        for (let i = 0; i < data.length; i++) {
          let cpu = (data[i].value * 100).toFixed(2) as any;

          cpus.push(cpu);
        }

        this.chartData.seriesData = [] as any;
        this.chartData.seriesData.push({ data: cpus });
      })
      .catch((err: any) => {
        throw err;
      });
  }
}
</script>

<style lang="scss">
@import "./dashboardBlockBase.scss";
</style>
