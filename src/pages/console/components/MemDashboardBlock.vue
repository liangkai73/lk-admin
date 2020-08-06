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
    :class="blockSizeTypeCssClass"
  >
    <div @mouseover="onMouseOver" @mouseleave="onMouseLeave" v-loading="loadingShow">
      <p class="flex_r_c dashboard-block__title">
        <span class="ui-smoothing">{{ title }}</span>
        <span class="flex1"></span>
        <span
          v-show="show_option"
          class="dashboard-block__title__control"
          @click="onClickViewType"
          >{{ $i18n('console.components.MemDashboardBlock.切换') }}</span
        >
        <span
          v-show="show_option"
          class="dashboard-block__title__control"
          @click="onClickBlock"
          >{{ $i18n('console.components.MemDashboardBlock.详细') }}</span
        >
      </p>
      <ui-chart
        v-if="useRing"
        class="dashboard-block__chart"
        :chart-data="charDataRing"
        :brush="charDataRing.brush"
        :type="charDataRing.type"
        width="100%"
        height="200px"
      >
      </ui-chart>
      <ui-chart
        v-else
        class="dashboard-block__chart"
        :chart-data="chartData"
        :brush="chartData.brush"
        :type="chartData.type"
        width="100%"
        height="200px"
      ></ui-chart>

      <div
        v-if="useRing"
        class="dashboard-block__chartRing_percent"
        :title="$i18n('console.components.MemDashboardBlock.已经占用限制值50%')"
      >
        <p>{{ current_mem }}</p>
        <p>%</p>
      </div>
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
        value: 1,
      },
      {
        value: 100,
      },
    ],
  };

  timer = null as any;
  current_mem = 0;
  show_option = false;
  loadingShow = true;

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
    this.title = $i18n('console.components.MemDashboardBlock.内存(MB)');
    this.href = "/console/overview-config";

    for (let i = 0; i <= 60; i += 5) {
      this.chartData.xAxisData.push(i);
    }

    this.getCurrentMem();
    this.getLastMem();

    let self = this;
    this.timer = setInterval(() => {
      self.getCurrentMem();
      self.getLastMem();
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
      path: "/productCenter/memory",
    });
  }

  onClickViewType() {
    this.useRing = !this.useRing;
  }

  getCurrentMem() {
    api.ars.ars
      .current_mem({ noLoading: true })
      .then((data: any) => {
        this.current_mem = 0;

        if (data && data.length > 0) {
          this.current_mem = data[0].value;
          let limit_mem = data[0].limit;
          console.log(this.current_mem);

          // this.current_mem = (this.current_mem * 100).toFixed(2) as any;

          this.current_mem = ((this.current_mem / limit_mem) * 100).toFixed(
            2
          ) as any;

          this.charDataRing.seriesData = [] as any;
          this.charDataRing.seriesData.push(this.current_mem);
          this.charDataRing.seriesData.push(100.0 - this.current_mem);
        } else {
          this.charDataRing.seriesData = [{ value: 0 }, { value: 100 }] as any;
        }
      })
      .catch((err: any) => {
        throw err;
      }).finally(() => {
        this.loadingShow = false
      })
  }

  getLastMem() {
    api.ars.ars
      .last_mem()
      .then((data: any) => {
        let mems = [];

        for (let i = 0; i < data.length; i++) {
          // let mem = (data[i].value * 100).toFixed(2) as any;
          let mem = ((data[i].value / data[i].limit) * 100).toFixed(2) as any;
          mems.push(mem);
        }

        this.chartData.seriesData = [] as any;
        this.chartData.seriesData.push({ data: mems });
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
