<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lcs
* Date: 2021-04-02 16:14
* Desc: 展开侧边栏 - 权限管理
*/
 -->
 <style lang='scss'>
.headTitle {
  font-weight: bold;
}
.warn-site-inner {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  position: relative;
  padding: 20px;
  font-size: 12px;
  .site-list-bottom {
    height: 50px;
    width: 100%;
    padding: 0 24px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  h5 {
    margin-bottom: 8px;
    color: #999;
    font-weight: normal;
  }
  >.cell {
    min-height: 40px;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 0px;
    display: flex;
    .title {
      width: 20%;
      color: #999;
    }

    .content {
      width: 80%;
      color: #000;
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
    ref="siteSideView">
    <div slot="header" class="of-drawer-head flex_r_c">
      <div>
        <div>
          <span class="headTitle">{{data_event.subject}}</span>
        </div>
      </div>
      <span class="flex1"></span>
      <ui-icon
        class="cur_P"
        name="close3"
        style="font-size: 16px"
        @click="close"></ui-icon>
    </div>
    <div class="warn-site-inner">
      <div class="cell ">
        <h5 class="title">{{ $i18n('notification.messageDetail.内容') }}</h5>
        <div class="content" v-html="data_event.content"></div>
      </div>
      <div class="cell ">
        <div class="title">{{ $i18n('notification.messageDetail.账号') }}</div>
        <div class="content">{{ data_event.t_id }}</div>
      </div>

      <div class="cell ">
        <div class="title">{{ $i18n('notification.messageDetail.创建时间') }}</div>
        <div class="content">{{ data_event.created_at | filterTime }}</div>
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
import filter from "@/filters";

@Component({
  components: {
    uiSiderView,
  },
  filters: {
    filterTime(val: Date) {
      return filter.getDateStr(new Date(val), 2);
    }
  },
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

  }

  close() {
    (this.$refs.siteSideView as any).close();
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() { }
  mounted() { }
}
</script>
