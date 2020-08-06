<!--
/**
* Copyright (c) 2020 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2020-08-21 11:02
* Desc:  注释模块样式
*/
 -->

<template>
  <div :style="{
    'color':color,
    'background':bgcolor
  }" class="faas-note-item flex_r_c">
    <ui-icon name="info" style="margin-right:15px;font-size:18px" v-show="aboutIcon"></ui-icon>
    <div class="flex1">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
  } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class extends Vue {
    //
    // Prop
    @Prop({
      type: String,
      default: '#0046b9'
    }) color: string | undefined;
    @Prop({
      type: String,
      default: '#d5e7ff'
    }) bgcolor: string | undefined;
    @Prop({
      type: Boolean,
      default: true
    }) aboutIcon: boolean | undefined;

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .faas-note-item {
    font-size: 12px;
    line-height: inherit;
    padding: 15px 20px;
    vertical-align: middle;
    border-width: 0;
    border-radius: 0;
    position: relative;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;

    .note-item-title {
      font-weight: bold;
    }
  }
</style>