<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 14:02
* Desc: console siderbar-menu
*/
 -->

<template>
  <div class="siderbar-container">
    <p style="margin-top: 28px"></p>
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
  import siderBar from "@/components/layout/siderbar.vue";

  @Component({
    components: {
      siderBar,
    },
  })
  export default class extends Mixins(siderBarMixin) {

    menuList = [{
        title: $i18n('layouts.console.siderbar.首页'),
        path: "/console/overview",
        icon: "home",
        account: "overview",
      },
      {
        title: $i18n('layouts.components.drawer.系统设置'),
        path: "/system/mail",
        icon: "faas",
      },
      {
        title: $i18n('layouts.console.siderbar.租户管理'),
        path: "/tenant/list",
        icon: "feiyong",
        account: "expenses",
      },
      // {
      //   title: $i18n('layouts.console.siderbar.成本优化'),
      //   path: "/costOptimization/overview",
      //   icon: "costOptimization",
      //   account: "costOptimization",
      // },
      // {
      //   title: $i18n('layouts.console.siderbar.性能优化'),
      //   path: "/console/performance",
      //   icon: "performance",
      // },
      // {
      //   title: $i18n('layouts.console.siderbar.云安全'),
      //   path: "/console/yun1",
      //   icon: "yunanquan",
      // },
      // {
      //   title: $i18n('layouts.console.siderbar.智能运维'),
      //   path: "/console/yun3",

      //   icon: "zhinengyunwei",
      // },
      // {
      //   title: $i18n('layouts.console.siderbar.容器服务'),
      //   path: "/cloudProvider/container",

      //   icon: "rongqifuwu",
      // },
      // {
      //   title: $i18n('layouts.console.siderbar.应用管理'),
      //   path: "/productCenter",
      //   icon: "faas",
      // },
    ];
    moudleName = "console";

    //
    // lifecycle hook.
    constructor() {
      super();
    }
    created() {}
    mounted() {}
  }

</script>

<style lang="scss" scoped>

</style>
