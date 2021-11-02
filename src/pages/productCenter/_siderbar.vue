<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: config siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <h2>应用管理</h2>
    <siderBar :moudleName="moudleName" :menuList="menuList"></siderBar>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
import siderBarMixin from "@/components/layout/siderbarMixin";

import siderBar from '@/components/layout/siderbar.vue';

@Component({
  components: {
    siderBar
  },
})
export default class extends Mixins(siderBarMixin) {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;
  menuList = [
    {
      title: $i18n('Web服务管理'),
      path: "/productCenter",
      activePath: ["/productCenter/detail"],
      icon: "",
    },
    {
      title: $i18n('服务组'),
      path: "/productCenter/group",
      icon: "",
    },];
  moudleName = "cloudProvider";
  
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
  created() {
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
</style>
