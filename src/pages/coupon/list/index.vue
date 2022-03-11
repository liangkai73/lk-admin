<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-08 14:45
* Desc: 独立站模板列表
*/
 -->

<template>
  <contentView :title="'优惠券列表'">
    <!-- <p>
      <button @click="type = 'app'">网格</button>
      <button @click="type = 'list'">列表</button>
    </p> -->
    <div class="template-items">
      <template v-if="type == 'app'">
        <div
          class="template-item-app"
          v-for="item in 8"
          @click="linkTo('detail')"
          :key="item"
        >
          优惠券{{ item }}
        </div>
      </template>
      <template v-if="type == 'list'">
        <p class="template-item-list flex_r_s" v-for="item in 8" :key="item">
          <span> coupon{{ item }} </span>
          <span class="flex1"></span>
          <button @click="linkTo('detail')">查看</button>
        </p>
      </template>
    </div>
  </contentView>
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
  components: {
    contentView,
  },
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
  type = "list";

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
  linkTo(url) {
    if (url == "detail") {
      this.$navbar.push({
        path: "/template/detail",
      });
    }
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
.template-item-app {
  width: calc(20% - 20px);
  min-width: 250px;
  height: 200px;
  float: left;
  background: #ccc;
  margin-right: 20px;
  margin-top: 20px;
  padding: 10px;
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 2px solid #aaa;
  &:hover {
    border-color: rgb(238, 89, 89);
    cursor: pointer;
  }
}
.template-item-list {
  height: 30px;
  // background: #ccc;
  margin-top: 5px;
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
