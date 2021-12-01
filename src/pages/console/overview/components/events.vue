<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-15 13:48
* Desc: index-消费分布
*/
 -->
 <style lang="scss" scoped>
.enpenses-item {
  padding: 16px;
  height: 100%;
  .enpenses-item-title {
    font-size: 14px;
    font-weight: 600;
  }
  #distributeChart1 {
    width: 100%;
    height: 240px;
    margin-top: 17px;
  }
}

.events-card {
  height: 80px;
  widows: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  // border-radius: 5px;

  .title {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #000000;
  }

  .count {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #000000;
    font-weight: 600;
  }
}

.events-card:hover {
  border: solid 1px #0077ff;
  // background-color: #000000 !important;
}
</style>

<template>
  <ui-card class="enpenses-item distribute">
    <p class="enpenses-item-title">
      {{ $i18n("console.overview.components.events.事件") }}
    </p>
    <div class="mt10">
      <div class="events-card flex_r_s" @click="goSys">
        <div style="width: 20%">
          <ui-icon name="taskEvent" style="font-size: 32px"></ui-icon>
        </div>
        <div style="width: 40%" class="title">
          {{ $i18n("console.overview.components.events.系统事件") }}
        </div>
        <div class="flex1"></div>
        <div class="count">
          {{ total_sys }} {{ $i18n("console.overview.components.events.次") }}
        </div>
      </div>
      <div class="events-card flex_r_s" @click="goJob">
        <div style="width: 20%">
          <ui-icon name="doEvent" style="font-size: 32px"></ui-icon>
        </div>
        <div style="width: 40%" class="title">
          {{ $i18n("console.overview.components.events.任务事件") }}
        </div>
        <div class="flex1"></div>
        <div class="count">
          {{ total_job }} {{ $i18n("console.overview.components.events.次") }}
        </div>
      </div>
    </div>
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

import dateLibs from "./dateLibs";
import api from "@/api";

@Component({
  components: {},
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

  total_sys = 0;
  total_job = 0;

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

  created() {}

  getTotalSys() {
    let params = {
      pageNo: 1,
      pageSize: 19,
      classify: "SYS",
    } as any;

    api.event.event
      .displays(params)
      .then((data: any) => {
        console.log(data);
        this.total_sys = data.total;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  getTotalJob() {
    let params = {
      pageNo: 1,
      pageSize: 19,
      classify: "JOB",
    } as any;

    api.event.event
      .displays(params)
      .then((data: any) => {
        console.log(data);

        this.total_job = data.total;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  mounted() {
    this.getTotalSys();
    this.getTotalJob();
  }

  goSys() {
    this.$navbar.push({
      path: "/notification/system",
    });
  }

  goJob() {
    this.$navbar.push({
      path: "/notification/task",
    });
  }
}
</script>
