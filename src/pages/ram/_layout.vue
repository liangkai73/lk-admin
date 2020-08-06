<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-08-19 10:35
* Desc: ram访问控制 layout
*/
 -->

<template>
  <div>
    <navbar></navbar>
    <div class="layout-container">
      <siderbar></siderbar>

      <ui-navbar-view rootRoutePath="/ram" pageAnimation="">
      </ui-navbar-view>
    </div>
    <drawer />
  </div>
</template>

<script lang="ts">
  import navbar from "@/components/layout/navbar.vue";
  import drawer from "@/components/layout/drawer.vue"
  import siderbar from "./_siderbar.vue";
  import * as netStore from "@/api/store/netStore";
  import {
    Component,
    Vue,
    Prop,
    // Watch,
    Provide,
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
    // data.
    guideType: "index" | "account" | "store" | "nomal" | "close" | "addUser" =
      "addUser";
    guideStatus = {
      account: false,
      store: false,
      info: false,
      addUser: false,
    };
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

    mounted() {
      console.log();
    }
  }
</script>
