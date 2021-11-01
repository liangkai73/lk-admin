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
        >{{ $i18n('productCenter.group.components.MemDashboardBlock.切换') }}</span
      >
      <span class="dashboard-block__title__control" @click="onClickBlock"
        >{{ $i18n('productCenter.group.components.MemDashboardBlock.详细') }}</span
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
      :title="$i18n('productCenter.group.components.MemDashboardBlock.已经占用限制值50%')"
    >
      <p>50</p>
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
    xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    seriesData: [
      {
        data: [200, 192, 10, 144, 160, 130, 140],
      },
    ],
  };
  @Provide() charDataRing: any = {
    type: "pieChart",
    span: 8,
    seriesData: [
      {
        value: 30,
      },
      {
        value: 70,
      },
    ],
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

  mounted() {
    this.sizeType = DashboardBlockSizeType.size1;
    this.title = $i18n('productCenter.group.components.MemDashboardBlock.内存');
    this.href = "/console/overview-config";
  }

  onClickBlock() {
    this.$navbar.push({
      path: "/productCenter/memory",
    });
  }

  onClickViewType() {
    this.useRing = !this.useRing;
  }
}
</script>

<style lang="scss">
@import "./dashboardBlockBase.scss";
</style>
