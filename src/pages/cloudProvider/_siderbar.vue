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
    <h2>{{ $i18n('layouts.notification.siderbar.消息中心') }}</h2>
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
      title: $i18n('layouts.notification.siderbar.消息通知'),
      path: "/notification/message",
      icon: "",
    },
             {
      title: $i18n('layouts.notification.siderbar.系统事件'),
      icon: '',
      path: '/notification/system',
    },
    {
      title: $i18n('layouts.notification.siderbar.任务事件'),
      path: '/notification/task',
      icon: '',
    },
  ];
  moudleName = "notification";
  
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
