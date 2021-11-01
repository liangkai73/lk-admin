<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-24 15:11
* Desc: store - detail
*/
 -->

<template>
  <content-view
    :gutter="false"
    :showBack="true"
    class="faas-content store-detail-content"
    :title="app_info.name"
  >
    <div class="store-detail-base mt20">
      <div class="detail-base-info">
        <p style="font-size: 18px; font-weight: 600">{{ $i18n('productCenter.memory.detail.基本信息') }}</p>
        <ui-row class="mt20">
          <ui-col :span="8">
            <p class="info-title">{{ $i18n('productCenter.memory.detail.名称') }}</p>
            <p>{{ app_info.name }}</p>
          </ui-col>
          <ui-col :span="8">
            <p class="info-title">{{ $i18n('productCenter.memory.detail.所属分组') }}</p>
            <p>{{ app_info.catalogName }}</p>
          </ui-col>
        </ui-row>
      </div>
      <ui-tabs
        :data="baseInfoTabsArr"
        title="name"
        :type="'card'"
        v-model="baseInfoTabsVal"
      ></ui-tabs>
      <div class="time-setting flex_r_s">
        <div class="flex1"></div>
        <div
          class="btn-setting flex_c_c"
          v-for="(item, index) in time_group"
          :key="index"
          :class="item.choose ? 'is-activate' : ''"
          @click="handleTime(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div v-if="is_empty" class="flex_c_c" style="height: 360px">
        <bp-icon
          name="Failed"
          style="color: rgba(0, 0, 0, 0.38); font-size: 30px"
        ></bp-icon>
        
        <!-- 暂无数据 -->
        <ui-no-records style="margin-top: 10px;"/>
      </div>
      <div v-else>
        <ui-chart
          class="dashboard-block__chart"
          :chart-data="chartData"
          :brush="chartData.brush"
          :type="chartData.type"
          width="100%"
          height="360px"
        ></ui-chart>
      </div>
    </div>
  </content-view>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import bpui from "bpui.js";
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";
import siderView from "@/components/ui/uiSiderView.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiTabs from "@/components/ui/uiTabs.vue";
import uiPagination from "@/components/ui/uiPagination.vue";

import filter from "@/libs/filter";

var uiChart = require("@/components/ui/uiChart");

@Component({
  components: {
    contentView,
    siderView,
    uiDialog,
    bpInput: bpui.bpInput,
    uiTabs,
    uiPagination,
    uiChart: uiChart.default,
  },
})
export default class extends Vue {
  // 基本信息 -tabs arr
  baseInfoTabsArr = [
    {
      name: $i18n('productCenter.memory.detail.内存使用'),
      value: 1,
    },
  ];

  baseInfoTabsVal = 1;

  // 曲线数据.
  chartData: any = {
    type: "lineChart",
    unit: "cm",
    span: 8,
    xAxisData: [],
    yAxisData: {
      // min: 0,
      //  max: 100,
    },
    seriesData: [
      {
        data: [],
      },
    ],
  };

  is_empty = false;
  app_id = "";
  app_info = {} as any;
  current_time = 24 * 60 * 60 * 1000;

  time_group = [
    { name: $i18n('productCenter.memory.detail.1小时'), value: 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.3小时'), value: 3 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.6小时'), value: 6 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.12小时'), value: 12 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.1天'), value: 24 * 60 * 60 * 1000, choose: true },
    { name: $i18n('productCenter.memory.detail.3天'), value: 3 * 24 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.7天'), value: 7 * 24 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.14天'), value: 14 * 24 * 60 * 60 * 1000, choose: false },
    { name: $i18n('productCenter.memory.detail.30天'), value: 30 * 24 * 60 * 60 * 1000, choose: false },
  ];
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

  created() {
    let query = this.$route.query as any;

    this.app_id = query.id;

    this.getInfo(query.id);

    this.getMem();
  }

  handleTime(index: any) {
    let time = this.time_group[index];

    if (this.current_time != time.value) {
      this.current_time = time.value;

      for (let i = 0; i < this.time_group.length; i++) {
        if (i == index) this.time_group[i].choose = true;
        else this.time_group[i].choose = false;
      }

      this.getMem();
    }
  }

  getInfo(id: string) {
    api.app
      .getApp(id)
      .then((data: any) => {
        console.log(data);
        this.app_info = data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  getMem() {
    let current_time = new Date().getTime();
    let end = this.current_time;
    let startTime = current_time - end;

    console.log(this.current_time / (60 * 1000));

    let interval = this.current_time / (60 * 60 * 1000) + "m";

    if (this.current_time == 60 * 60 * 1000 * 24)
      interval = this.current_time / (60 * 1000 * 24) + "m";
    else if (this.current_time > 60 * 60 * 1000 * 24) interval = 60 * 24 + "m";

    // if(this.current_time == 60 * 60 * 1000 * 24)
    // let end_time = 0;
    // let start_time = 0;
    // {
    //     let time = new Date();
    //     let hour = time.getHours();
    //     end_time = new Date(
    //       time.getFullYear(),
    //       time.getMonth(),
    //       time.getDate(),
    //       hour,
    //       0,
    //       0
    //     ).getTime();
    //     start_time = new Date(
    //       time.getFullYear(),
    //       time.getMonth(),
    //       time.getDate(),
    //       0,
    //       0,
    //       0
    //     ).getTime();

    //     this.chartData.xAxisData = [];

    //     for (let i = 0; i < 24; i++) {
    //       this.chartData.xAxisData.push(
    //         filter.getDateStr(new Date(start_time + i * 60 * 60 * 1000), 7)
    //       );
    //     }
    // }

    let params = {
      app: this.app_id,
      interval: interval,
      startTime: startTime,
      endTime: current_time,
    };

    api.ars.ars
      .mem(params)
      .then((data: any) => {
        if (data.length > 0) {
          this.chartData.xAxisData = [];

          let mems = [];
          for (let i = 0; i < data.length; i++) {
            if (this.current_time < 60 * 60 * 1000 * 24)
              this.chartData.xAxisData.push(
                filter.getDateStr(new Date(data[i].time), 7)
              );
            else if (this.current_time == 60 * 60 * 1000 * 24)
              this.chartData.xAxisData.push(
                filter.getDateStr(new Date(data[i].time), 1)
              );
            else if (this.current_time > 60 * 60 * 1000 * 24)
              this.chartData.xAxisData.push(
                filter.getDateStr(new Date(data[i].time), 0)
              );

            let mem = (data[i].value / (1024 * 1024)).toFixed(2) as any;

            mems.push(mem);
          }

          this.chartData.seriesData = [] as any;
          this.chartData.seriesData.push({ data: mems });
          this.is_empty = false;
        } else {
          this.is_empty = true;
        }
      })
      .catch((err: any) => {
        throw err;
      });
  }

  mounted() {}
}
</script>

<style lang="scss">
.store-detail-content {
  .store-detail-base {
    background: #fff;
  }
  .detail-base-info {
    padding: 20px;
  }
  .info-title {
    color: #8c8c8c;
    margin: 10px 0;
  }
  .faas-table-group {
    width: 100%;
  }
  .store-detail-mirror {
    background: #fff;
  }

  .time-setting {
    height: 80px;

    .btn-setting {
      height: 30px;
      padding: 0px 10px;
      margin-right: 10px;
      background-color: rgba($color: #000000, $alpha: 0.1);
      color: #222;
      border-radius: 5px;
      cursor: pointer;
    }

    .is-activate {
      background-color: #1baaf5;
      color: #ffffff;
    }
  }
}
</style>

