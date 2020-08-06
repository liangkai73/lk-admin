<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
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
        :barHidden="true"
        rootRoutePath="/system"
        pageClass="system-config-navbarView"
        pageAnimation=""
      ></ui-navbar-view>
    </div>
    <drawer />
  </div>
</template>

<script lang="ts">
import navbar from "@/components/layout/navbar.vue";
import drawer from "@/components/layout/drawer.vue";
import siderbar from "./_siderbar.vue";
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
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
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {
    console.log();
  }
}
</script>

<style lang="scss">

</style>
