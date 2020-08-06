<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-02 16:14
* Desc: 展开侧边栏 - 权限管理
*/
 -->
 <style lang='scss'>

 @import '~@bpui/ui/var';

.warn-site-inner {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  position: relative;
  padding: 20px;

  .inner-site-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 24px;

    .list-item {
      min-height: 40px;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      @include ui-theme-border-bottom("border");
      .span-title {
        color: #999;
        user-select: none;
        display: inline-block;
        min-width: 170px;
      }
      .item-progress {
        margin: 20px 0;
        .el-progress {
          display: inline-block;
        }
      }
      .list-item-bottom {
        margin: 20px 0;
        width: 100%;
        .bp-input {
          overflow: hidden;
          background: #e5e5e5;
        }
        .bp-input__inner {
          height: 24px;
        }
      }
      .item-title-copy {
        padding: 0 5px;
        color: #1baaf5;
        cursor: pointer;
      }
    }
  }
  .site-list-bottom {
    height: 50px;
    width: 100%;
    padding: 0 24px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .cell {
    min-height: 40px;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 0px;
    
    .title{
      width: 20%;
      color: rgba($color: #000000, $alpha: 0.38);
    }

    .content {
      width: 80%;
       word-wrap: break-word;
    }
  }
}
</style>

<template>
  <uiSiderView
    v-model="show_view"
    :closeOnClickModal="true"
    :width="650"
    ref="siteSideView"
  >
    <div slot="header" class="of-drawer-head flex_r_c">
      <div>
        <div>
          <!-- <bp-icon
            v-if="data_event.type == 'warn'"
            name="warn"
            style="font-size: 20px; color: #ffcc00"
          ></bp-icon>
          <bp-icon
            v-if="data_event.type == 'error'"
            name="yanzhong"
            style="font-size: 20px; color: #ff443a"
          ></bp-icon>
          <bp-icon
            v-if="data_event.type == 'help'"
            name="help"
            style="font-size: 20px; color: #1baaf5"
          ></bp-icon> -->
          <span class="of-drawer-head-title" style="margin-left: 10px">{{data_event.type_name||data_event.id}}</span>
        </div>
      </div>
      <span class="flex1"></span>
      <bp-icon
        class="cur_P"
        name="close3"
        style="font-size: 16px"
        @click="close"
      ></bp-icon>
    </div>
    <div class="warn-site-inner">
            <div class="cell flex_r_s">
        <div  class="title">{{ $i18n('notification.sideViewDetail.事件源') }}</div>
        <div class="content">{{ $i18n(data_event.sourceTitle) }}</div>
      </div>

       <div class="cell flex_r_s">
        <div class="title">{{ $i18n('notification.sideViewDetail.事件类型') }}</div>
        <div class="content">{{ $i18n(data_event.typeTitle) }}</div>
      </div>

       <div class="cell flex_r_s">
        <div class="title">{{ $i18n('notification.sideViewDetail.用户名称') }}</div>
        <div class="content">{{ (data_event.faasTenant && data_event.faasTenantTitle) ? data_event.faasTenantTitle : "-" }}</div>
      </div>

      <div class="cell flex_r_s">
        <div class="title">{{ $i18n('notification.sideViewDetail.内容') }}</div>
        <div class="content">{{ data_event.displayContent }}</div>
      </div>

      <div class="cell flex_r_s">
        <div  class="title">{{ $i18n('notification.sideViewDetail.时间') }}</div>
        <div class="content">{{ data_event.time }}</div>
      </div>
    </div>
  </uiSiderView>
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
import uiSiderView from "@/components/ui/uiSiderView.vue";
import bpui from "bpui.js";
import api from "@/api";

@Component({
  components: {
    uiSiderView,
    bpInput: bpui.bpInput,
    bpCheckbox: bpui.bpCheckbox,
  },
  name: "sideViewDetail"
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
  @Prop({ type: Boolean }) value!: boolean;
  @Prop({ type: Object }) data!: any;

  //
  // data.
  // @Provide() demo:number = 1;
  showSiderView = true;
  show_view = false;
  data_event = {} as any;

  show(data: any) {
    this.data_event = data;

    this.show_view = true;

    console.log(data);
  }

  close() {
    (this.$refs.siteSideView as any).close();
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {}
  mounted() {}
}
</script>
