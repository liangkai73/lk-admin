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
    class="overview-body-item dashboard-block dashboard-block-activity"
    :class="blockSizeTypeCssClass"
  >
    <p class="flex_r_c dashboard-block__title">
      <span class="ui-ellipsis">{{ title }}</span>
      <span class="flex1"></span>
      <span class="dashboard-block__title__control" @click="onClickBlock"
        >{{ $i18n('console.components.ActivityDashboardBlock.查看') }}</span
      >
    </p>
    <p class="flex_r_c dashboard-block__title_subhead">
      <span>{{ $i18n('console.components.ActivityDashboardBlock.总计') }}</span>
      <span>{{ total }}{{ $i18n('console.components.ActivityDashboardBlock.个') }}</span>
    </p>

    <!-- <div class="dashboard-block__content_list" style="display: flex;justify-content: center;align-items: center;color: #999;">
      无
    </div> -->
    <div class="dashboard-block__content_list">
      <p class="ui-ellipsis" v-for="(item, index) in list_events" :key="index">
        {{ item.eventMsg }}
      </p>
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

@Component({
  components: {},
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
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //
  // lifecycle hook.
  total = 0;
  list_events = [] as any;

  constructor() {
    super();
  }

  mounted() {
    this.sizeType = DashboardBlockSizeType.size1;
    this.title = $i18n('console.components.ActivityDashboardBlock.事件');
    // this.href = "/console/overview-config";
    this.querList();
  }

  onClickBlock() {
    this.$navbar.push({
      path: "/warn/event",
    });
  }

  querList() {
    let params = {
      pageNum: 1,
      pageSize: 20,
    };

    api.app.getEventList(params, { noLoading: true })
      .then((data: any) => {
        this.total = data.total;
        this.list_events = data.list;
      })
      .catch((err: any) => {
        throw err;
      });
  }
}
</script>

<style lang="scss">
@import "./dashboardBlockBase.scss";

.dashboard-block-activity {
  .dashboard-block__content_list {
    overflow-y: scroll;
    height: 140px;
    margin-top: 25px;
    font-size: 14px;

    & > p {
      margin: 0;
      padding: 5px 7px 5px 10px;
      color: #222;

      &:nth-child(odd) {
        background: #f7f7f7;
      }

      &:nth-child(even) {
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    /* 滚动条的滑轨背景颜色 */
    &::-webkit-scrollbar-track {
      background-color: #ededed;
    }

    /* 滑块颜色 */
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.35);
      border-radius: 0px;
    }

    /* 滑轨两头的监听按钮颜色 */
    &::-webkit-scrollbar-button {
      background-color: rgba(0, 0, 0, 0.12);
      height: 0px;
      width: 0px;
    }

    /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
    &::-webkit-scrollbar-corner {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
