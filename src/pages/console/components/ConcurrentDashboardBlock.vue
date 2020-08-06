<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: brian.li
* Date: 2021-04-17 14:34
* Desc: 
*/
 -->

<template>
  <ui-card
    class="overview-body-item dashboard-block"
    :class="blockSizeTypeCssClass">
    <div @mouseover="onMouseOver" @mouseleave="onMouseLeave" v-loading="loadingShow">
      <p class="flex_r_c dashboard-block__title">
        <span class="ui-smoothing">{{ title }}</span>
        <span class="flex1"></span>
        <span
          v-show="show_option"
          class="dashboard-block__title__control"
          @click="onClickBlock">{{ $i18n('console.components.ConcurrentDashboardBlock.查看') }}</span>
      </p>
      <ui-chart
        class="dashboard-block__chart"
        :chart-data="chartData"
        :brush="chartData.brush"
        :type="chartData.type"
        width="100%"
        height="200px"></ui-chart>
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
import filter from "@/filters";

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

  timer = null as any;
  current_cpu = 0;
  show_option = false;
  loadingShow: boolean = true;
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
    this.title = $i18n('console.components.ConcurrentDashboardBlock.并发量');
    this.href = "/console/overview-config";

    // for (let i = 0; i <= 60; i += 5) {
    //   this.chartData.xAxisData.push(i);
    // }

    this.getLastConn();

    let self = this;
    this.timer = setInterval(() => {
      self.getLastConn();
      // 某些定时器操作
    }, 60 * 1000);
  }

  onMouseOver() {
    this.show_option = true;
  }

  onMouseLeave() {
    this.show_option = false;
  }

  onClickBlock() {
    this.$navbar.push({
      path: "/productCenter/conn",
    });
  }

  onClickViewType() {
    this.useRing = !this.useRing;
  }

  getLastConn() {
    api.ars.ars
      .last_conn({ noLoading: true })
      .then((data: any) => {
        let conns = [];

        this.chartData.xAxisData = [];

        for (let i = 0; i < data.length; i++) {
          this.chartData.xAxisData.push(
            filter.getDateStr(new Date(data[i].time), 7)
          );

          // let conn = (data[i].value * 100).toFixed(2) as any;
          let conn = data[i].value;

          conns.push(conn);
        }

        this.chartData.seriesData = [] as any;
        this.chartData.seriesData.push({ data: conns });
      })
      .catch((err: any) => {
        throw err;
      }).finally(() => {
        this.loadingShow = false
      })
  }
}
</script>

<style lang="scss">
@import "./dashboardBlockBase.scss";
</style>
