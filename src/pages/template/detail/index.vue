<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-08 15:32
* Desc: 详情
*/
 -->

<template>
  <contentView :title="title" :isBreadcrumb="true">ITEM详情</contentView>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
// import { State, Mutation } from "vuex-class";
import contentView from "@/components/layout/contentView.vue";

@Component({
  components: { contentView },
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

  //
  // data.
  // @Provide() demo:number = 1;
  title = {
    root: { path: "/template/list", title: "模板列表" },
    branch: {
      title: "模板详情",
    },
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

  mounted() {}
}
</script>
