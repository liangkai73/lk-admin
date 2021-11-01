<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-08 16:54
* Desc: 应用item2
*/
 -->
<style lang='scss' scoped>
$width: 23.4%;

.app-item {
  width: $width;
  height: $width;
  background-color: #fff;
  margin: 0 0.8% 15px 0.8%;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0px 1px 3px 0px rgba(63, 63, 68, 0.15),
    0px 0px 0px 1px rgba(63, 63, 68, 0.05);
  &:hover {
    box-shadow: 0px 3px 10px 0px rgba(152, 162, 179, 0.5),
      0px 2px 2px -1px rgba(152, 162, 179, 0.3);
  }
  .item-head-before {
    width: 100%;
    height: 5px;
  }
  .item-head {
    width: 100%;
    height: 38px;
    padding: 0 16px;
    color: #000;
    font-size: 12px;
    border-bottom: 1px solid #eee;
  }
  .item-body {
    width: 100%;
    height: 131px;
    padding: 16px;
    border-bottom: 1px solid #eee;
    .body-status {
      width: 100%;
      font-size: 12px;
    }
    .body-icons {
      // width: 200px;
      height: 55px;
    }
    .body-icon {
      height: 100%;
      font-size: 12px;
      i {
        font-size: 24px;
        color: #8f92a1;
      }
    }
    .line1_c {
      width: 1px;
      height: 30px;
      background: #eee;
    }
    .rotate {
      i {
        animation: rotate360 2s linear infinite;
      }
    }
    @keyframes rotate360 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .item-foot {
    width: 100%;
    height: 52px;
    font-size: 12px;
    color: #8f92a1;
    align-items: start;
    padding: 0 16px;
    line-height: 20px;
  }
}
</style>
<template>
  <div class="app-item cur_P">
    <div
      class="item-head-before"
      :style="{ background: filterStatus(data.status).color }"
    ></div>
    <!-- head -->
    <div class="item-head flex_r_s">
      <bp-icon name="Cluster"></bp-icon>
      <span class="pl10">{{ data.name }}</span>
    </div>
    <!-- body -->
    <div class="item-body">
      <div
        class="body-status flex_r_s"
        :class="[{ rotate: data.status == 'Initial' }]"
      >
        <bp-icon
          :name="filterStatus(data.status).icon"
          style="font-size: 14px"
          :style="{ color: filterStatus(data.status).color }"
        ></bp-icon>
        <span
          class="pl10"
          :style="{ color: filterStatus(data.status).color }"
          >{{ $i18n(filterStatus(data.status).name) }}</span
        >
      </div>
      <div class="body-icons flex_r_c mt20">
        <div class="body-icon flex1 flex_c_c">
          <bp-icon name="CPU"></bp-icon>
          <span class="flex1"></span>
          <p>
            <span style="margin-right:2px;">{{ data.limitCpu }}</span>
            <span>Core</span>
          </p>
        </div>
        <span class="line1_c"></span>
        <div class="body-icon flex1 flex_c_c">
          <bp-icon name="RAM"></bp-icon>
          <span class="flex1"></span>
          <p>
            <span style="margin-right:2px;">{{ data.limitMem }}</span>
            <span>GB</span>
          </p>
        </div>
        <span class="line1_c"></span>
        <div class="body-icon flex1 flex_c_c">
          <bp-icon name="timeOut"></bp-icon>
          <span class="flex1"></span>
          <p>
            <span>{{ data.replicas }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- foot -->
    <div class="item-foot flex_c_c">
      <p>
        <span>{{
          $i18n("productCenter.components.appItem.运行语言环境:")
        }}</span>
        <span class="pl5">{{ data.runtimeName }}</span>
      </p>
      <p>
        <span>{{ $i18n("productCenter.components.appItem.修改时间:") }}</span>
        <span class="pl5">{{ data.updateTime | getDateStr(2) }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import { APP_STATUS } from "../libs";

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
  @Prop({ type: Object }) data!: any;

  //
  // data.
  // @Provide() demo:number = 1;
  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  filterStatus(status: string) {
    return (APP_STATUS as any)[status] || APP_STATUS.default;
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
