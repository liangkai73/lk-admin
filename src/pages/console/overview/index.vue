<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: console 首页
*/
 -->

<template>
  <content-view :gutter="false" class="flex1 console-view"
    :title="$i18n('console.overview.index.首页')">
    <ui-row :gutter="15" class="item-row">
      <ui-col :span="6" class="item-row-node">
        <user></user>
        <!-- <balance></balance> -->
      </ui-col>
      <ui-col :span="6" class="item-row-node">
        <events></events>
        <!-- <consume></consume> -->
      </ui-col>
      <!-- <ui-col :span="6" class="item-row-node">
        <distribute></distribute>
      </ui-col>
      <ui-col :span="6" class="item-row-node">
        <events></events>
      </ui-col> -->
    </ui-row>
    <!-- <ui-row :gutter="15" class="item-row mt10">
      <ui-col :span="12" class="item-row-node">
        <trend></trend>
      </ui-col>
      <ui-col :span="6" class="item-row-node">
        <user></user>
      </ui-col>
    </ui-row> -->
  </content-view>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    // Prop,
    // Watch,
    Provide,
    // Emit,
  } from "vue-property-decorator";
  import contentView from "@/components/layout/contentView.vue";
  import api from "@/api";
  import {
    events,
    user,
  } from "./components";
  @Component({
    components: {
      contentView,
      events,
      user
    },
    name: 'overviewIndex'
  })
  export default class extends Vue {
    //
    // event.
    // @Emit()
    // demoEvent(type: string) { }

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number }) demo: number;
    @Provide("ProvideObj") ProvideObj = {
      cloudProvider: "",
      activeAcct: "", //
      cloudAccount: "", // 云商账户id
    };

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
    total_app = 0;
    available_app = 0;

    constructor() {
      super();
    }

    mounted() {
      api.app.getAppCount().then((result: any) => {
        this.total_app = result.allAppCnt;
        this.available_app = result.availableAppCnt;
      });
    }

    handleApp() {
      this.$navbar.push({
        path: "/productCenter",
      });
    }
  }
</script>
<style lang="scss" scoped>
  .console-view {
    .item-row {
      height: 300px;
    }

    .item-row-node {
      height: 300px;
      width: 300px;
      padding-top: 7.5px;
      padding-bottom: 7.5px;
    }
  }
</style>
