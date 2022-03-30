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
    <navbar></navbar>
    <div class="layout-container">
      <siderbar></siderbar>

      <ui-navbar-view
        rootRoutePath="/list"
        pageClass="console-navbarView"
        pageAnimation=""
      />
    </div>
    <drawer />
  </div>
</template>

<script lang="ts">
import navbar from "@/components/layout/navbar.vue";
import siderbar from "./_siderbar.vue";
import drawer from "@/components/layout/drawer.vue";
import * as netStore from "@/api/store/netStore";
import { Component, Vue, Provide } from "vue-property-decorator";

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

  //
  // data.
  guideType: "index" | "account" | "store" | "addUser" | "close" = "index";

  iconClickShow = false;

  //
  // computed.

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {}
  mounted() {}
}
</script>

<style lang="scss">
</style>
