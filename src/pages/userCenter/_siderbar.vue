<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: config siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <h2>{{ $i18n('layouts.userCenter.siderbar.用户中心') }}</h2>
    <siderBar :moudleName="moudleName" :menuList="menuList"></siderBar>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
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
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;
  menuList = [
    {
      title: $i18n('layouts.userCenter.siderbar.账号设置'),
      path: "/userCenter/info",
      icon: "",
    },
    {
      title: $i18n('layouts.userCenter.siderbar.账号安全'),
      path: "/userCenter/safe",
      icon: "",
    },
  ];
  moudleName = "userCenter";
  
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