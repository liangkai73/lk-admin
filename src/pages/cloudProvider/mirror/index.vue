<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: console 首页
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content console-content flex1"
    :title="$i18n('cloudProvider.mirror.index.概览')"
  >
    <ui-card class="overview-head-items flex_r_c">
      <div class="overview-head-item flex1 flex_c_c">
        <b>36</b>
        <p>{{ $i18n('cloudProvider.mirror.index.待处理警告') }}</p>
      </div>
      <div class="overview-head-item flex1 flex_c_c">
        <b>36</b>
        <p>{{ $i18n('cloudProvider.mirror.index.待处理警告') }}</p>
      </div>
      <div class="overview-head-item flex1 flex_c_c">
        <b>36</b>
        <p>{{ $i18n('cloudProvider.mirror.index.待处理警告') }}</p>
      </div>
      <div class="overview-head-item flex1 flex_c_c">
        <b>36</b>
        <p>{{ $i18n('cloudProvider.mirror.index.待处理警告') }}</p>
      </div>
    </ui-card>
    <div class="overview-body-items">
      <ui-card
        :key="item"
        class="overview-body-item"
        v-for="item in 8"
      >
        <p
          class="flex_r_c"
          style="font-size:16px"
        >
          <span>{{ $i18n('cloudProvider.mirror.index.预警') }}</span>
          <span class="flex1"></span>
          <span>{{ $i18n('cloudProvider.mirror.index.周') }}</span>
        </p>
        <p>{{ $i18n('cloudProvider.mirror.index.本周预警次数') }}</p>
        <p class="item-number">{{ $i18n('cloudProvider.mirror.index.50次') }}</p>
      </ui-card>
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
} from 'vue-property-decorator';
import contentView from '@/components/layout/contentView.vue';

@Component({
  components: {
    contentView,
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
  // @Prop({ type: number }) demo: number;

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
  constructor() {
    super();
  }

  mounted() {}
}
</script>
<style lang="scss" scoped>
.overview-head-items {
  width: 100%;
  height: 100px;
  padding: 10px;
  .overview-head-item {
    height: 100%;
    cursor: pointer;
    border-right: 1px solid #e5e6ec;
    background: transparent;
    transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:last-child {
      border-right: none;
    }
    &:hover {
      background: #ededed;
    }
    b {
      font-size: 24px;
      line-height: 30px;
      letter-spacing: 1px;
      font-weight: 500;
    }
  }
}
.overview-body-items {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.overview-body-item {
  margin: 20px 20px 0 0;
  width: 33%;
  max-width: 308px;
  height: 308px;
  background: turquoise;
  padding: 10px;
  p {
    margin: 5px 0;
  }
  .item-number {
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;
    letter-spacing: 0px;
  }
}
</style>
