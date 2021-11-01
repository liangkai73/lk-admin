<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: brian.li
* Date: 2021-04-17 14:34
* Desc: 
*/
 -->

<template>
  <ui-card class="overview-body-item dashboard-block dashboard-block-cost" :class="blockSizeTypeCssClass">
    <p class="flex_r_c dashboard-block__title">
      <span class="bp-ellipsis">{{title}}</span>
      <span class="flex1"></span>
      <span class="dashboard-block__title__control" @click="onClickBlock">{{ $i18n('productCenter.group.components.CostDashboardBlock.查看') }}</span>
    </p>
    <p class="flex_r_c dashboard-block__title_subhead">
      <span>{{ $i18n('productCenter.group.components.CostDashboardBlock.本月消费金额') }}</span>
      <span>¥600.00 <span class="dashboard-block__title_subhead__down">-20%</span></span>
    </p>

    <ui-chart class="dashboard-block__chart" :extra-option="extraOption" :chart-data="charData" :brush="charData.brush"
      :type="charData.type" width="238px" height="150px"></ui-chart>
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
  } from 'vue-property-decorator';
  import {
    DashboardBlockMixins,
    DashboardBlockSizeType
  } from './dashboardBlockBase';
  var uiChart = require("@/components/ui/uiChart");

  @Component({
    components: {
      uiChart: uiChart.default
    }
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
    @Provide() charData: any = {
      type: "customChart",
      seriesData: [{
          name: $i18n('productCenter.group.components.CostDashboardBlock.2011年'),
          type: 'bar',
          data: [18203, 23489, 29034, 104970]
        },
        {
          name: $i18n('productCenter.group.components.CostDashboardBlock.2012年'),
          type: 'bar',
          data: [19325, 23438, 31000, 121594]
        }
      ],
    };
    @Provide() extraOption: any = {
      color: ["#ededed", "#59a8d8"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        containLabel: true
      },
      yAxis: {
        show: false,
      },
      xAxis: {
        show: true,
        type: 'category',
        axisLabel: {
          show: true
        },
        data: ['FC', 'Web', $i18n('productCenter.group.components.CostDashboardBlock.带宽'), $i18n('productCenter.group.components.CostDashboardBlock.存储')]
      },
    }

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
      this.title = $i18n('productCenter.group.components.CostDashboardBlock.费用');
      // this.href = "/console/overview-config";
    }

  }
</script>

<style lang="scss">
  @import "./dashboardBlockBase.scss";

  .dashboard-block-cost {

    .dashboard-block__title_subhead__down {
      font-size: 12px;
      color: #0acd7f;
    }

    .dashboard-block__title_subhead__up {
      font-size: 12px;
      color: #ff4444;
    }
  }
</style>
