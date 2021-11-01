<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: brian.li
* Date: 2021-04-17 14:34
* Desc: 
*/
 -->

<template>
  <ui-card class="overview-body-item dashboard-block" :class="blockSizeTypeCssClass">
    <p class="flex_r_c dashboard-block__title">
      <span class="bp-smoothing">{{title}}</span>
      <span class="flex1"></span>
      <!-- <span class="dashboard-block__title__control" @click="onClickBlock">查看</span> -->
    </p>
    <p style="font-size: 14px;margin: 0 !important;">{{ $i18n('productCenter.group.components.EventDashboardBlock.邀请合作伙伴加入') }}</p>
    <p style="color: #999;font-size: 14px;margin: 0 !important;">{{ $i18n('productCenter.group.components.EventDashboardBlock.不限名额') }}</p>
    <img :src="$i18n('productCenter.group.components.EventDashboardBlock.@/assets/活动@2x_png')" style="width: 190px;float: right;"></img>
    <button style="position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 14px;
    background-color: #59a8d8;
    border-radius: 0;
    color: #fff;
    height: 36px;">{{ $i18n('productCenter.group.components.EventDashboardBlock.查看详情') }}</button>
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
    DashboardBlockMixins, DashboardBlockSizeType
  } from './dashboardBlockBase';

  @Component({
    components: {}
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
    constructor() {
      super();
    }

    mounted() {
      this.sizeType = DashboardBlockSizeType.size1;
      this.title = $i18n('productCenter.group.components.EventDashboardBlock.活动');
      // this.href = "/console/overview-config";
    }

  }
</script>

<style lang="scss">
@import "./dashboardBlockBase.scss";
</style>
