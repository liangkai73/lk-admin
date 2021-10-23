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
    <h2>{{ $i18n('layouts.components.drawer.租户管理') }}</h2>
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

  menuList = [
    // {
    //   title: '新申请',
    //   path: "/tenant/apply",
    //   icon: "",
    // },
    {
      title: $i18n('layouts.tenant.租户列表'),
      path: "/tenant/list",
      icon: "",
    },
  ];
  moudleName = "tenant";

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