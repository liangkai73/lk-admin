<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 10:35
* Desc:
*/
 -->

<template>
  <div>
    <navbar @emitShowGuide="emitShowGuide"></navbar>
    <div class="layout-container">
      <siderbar v-if="
          $route.path != '/console/overview-config' &&
          $route.path != '/console/openServer'
        "></siderbar>

      <ui-navbar-view rootRoutePath="/console" pageClass="console-navbarView" pageAnimation="" />
    </div>
    <drawer />
  </div>
</template>

<script lang="ts">
  import navbar from "@/components/layout/navbar.vue";
  import siderbar from "./_siderbar.vue";
  import drawer from "@/components/layout/drawer.vue";
  import * as netStore from "@/api/store/netStore";
  import {
    Component,
    Vue,
    Provide,
  } from "vue-property-decorator";

  @Component({
    components: {
      navbar,
      siderbar,
      drawer,
    },
  })
  export default class extends Vue {
    //
    // Prop
    // @Prop({ type: number }) demo: number;
    guideStatus = {
      account: true,
      store: true,
      expense: true,
      info: true,
      addUser: true,
    };
    //
    // data.
    guideType: "index" | "account" | "store" | "addUser" | "close" = "index";

    iconClickShow = false;

    //
    // computed.
    get guideIndexShow() {
      const {
        guideStatus
      } = this;
      let isOk = true;
      // for (let key in guideStatus) {
      //   isOk = isOk && guideStatus[key];
      // }
      isOk = isOk && guideStatus["account"];
      isOk = isOk && guideStatus["store"];
      return !isOk;
    }

    //
    // lifecycle hook.
    constructor() {
      super();
    }
    created() {
      netStore.getNetStore("guideStatus").then((res) => {
        this.guideStatus = res;
      });
      // 如果是费用开通页
      if (this.$route.path == "/console/openServer") {
        this.guideType = "store";
      }
    }
    mounted() {}
    guideStart(key) {
      if (key == "account") {
        this.guideType = "account";
        this.iconClickShow = false;
      } else if (key == "store") {
        this.guideType = "store";
        this.iconClickShow = false;
      } else if (key == "info") {
        this.$navbar.push({
          path: "/userCenter/info",
        });
        this.iconClickShow = false;
      } else if (key == "addUser") {
        this.guideType = "addUser";
        this.iconClickShow = false;
      } else if (key == "close") {
        this.guideType = "close";
        this.iconClickShow = false;
      }
    }
    // 打开引导页
    emitShowGuide() {
      this.guideType = "index";
      this.iconClickShow = true;
    }
  }
</script>

<style lang="scss">


</style>
