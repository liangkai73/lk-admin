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
    <h2>数据统计</h2>
    <siderBar :moudleName="moudleName" :menuList="menuList"></siderBar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import siderBarMixin from "@/components/layout/siderbarMixin";
import siderBar from "@/components/layout/siderbar.vue";

@Component({
  components: {
    siderBar,
  },
})
export default class extends Mixins(siderBarMixin) {
  menuList = [
    {
      title: $i18n("layouts.stats.用户登录统计"),
      path: "/stats/list",
      icon: "",
    },
  ];
  moudleName = "stats";

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {}
  mounted() {}
}
</script>
