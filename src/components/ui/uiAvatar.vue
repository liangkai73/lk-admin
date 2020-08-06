<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-30 11:19
* Desc:  用户默认头像 
*/
 -->
<style lang='scss' scoped>
  .user-avatar-default {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ccc;
    font-size: 16px;
    color: #fff;
    flex-shrink: 0;
  }
</style>

<template>
  <div class="user-avatar-default flex_c_c"
    :style="{ background: relColor, width: size + 'px', height: size + 'px' }">
    <span>{{ filterName(name) }}</span>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    // Watch,
    // Provide,
    // Emit,
  } from "vue-property-decorator";

  @Component({
    components: {},
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
    @Prop({
      type: String,
      default: ""
    }) id: string;
    @Prop({
      type: String,
      default: ""
    }) name: string;
    @Prop({
      type: Number,
      default: 40
    }) size: number;

    //
    // data.
    // @Provide() demo:number = 1;

    //
    // computed.
    get relSize() {
      return this.size;
    }
    get relColor() {
      let color = "transparent";
      if (this.id.length >= 6) {
        color = "#" + this.id.slice(-6);
      } else {
        color = "#3437a5d6";
      }
      return color;
    }

    //
    // watch.
    // @Watch('child')
    // onChildChanged(val: string, oldVal: string) { }

    //
    // lifecycle hook.
    constructor() {
      super();
    }
    filterName(str) {
      return str.slice(0, 1).toUpperCase();
    }

    mounted() {}
    created() {}
  }
</script>
