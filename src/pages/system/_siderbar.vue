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
    <h2>{{ $i18n('layouts.system.siderbar.系统设置') }}</h2>
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

  menuList = [
    // {
    //   title: $i18n('layouts.system.siderbar.公共模块设置'),
    //   path: "/system/info",
    //   icon: "",
    // },
    {
      title: $i18n('layouts.system.siderbar.邮件模板管理'),
      path: "/system/mail",
      icon: "",
    },
    {
      title: $i18n('layouts.system.siderbar.短信模板管理'),
      path: "/system/sms",
      icon: "",
    },
    {
      title: $i18n('layouts.system.siderbar.站内信模板管理'),
      path: "/system/message",
      icon: "",
    },
  ];
  moudleName = "system";

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