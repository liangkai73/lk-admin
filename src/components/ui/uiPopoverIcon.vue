<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-09-02 17:46
* Desc: 
*/
 -->
<style lang="scss">
.popover-icon-label {
  margin-left: 3px;
}
// ui style
.bp-popover {
  /* 显示状态 */
  &.bp-widget__visible {
  }
  /* 隐藏状态 */
  &.bp-widget__invisible {
  }

  /* 除遮罩层外的对话框内容 */
  .bp-widget__content {
    /* 主区域 */

    .bp-popover__main {
      background: #fff;
      color: #333;
      max-width: 250px;
      border-radius: 0px;
      font-size: 14px;
      padding: 20px;
      text-align: left;
      position: relative;
      /* 箭头 */
      .bp-popover__arrow {
        border-top-color: #fff;
      }

      /* 箭头不同状态 */
      &[direction^='bottom'] {
      }
      &[direction^='top'] {
      }
      &[direction^='left'] {
      }
      &[direction^='right'] {
      }
    }
  }
}
</style>
<template>
  <label
    class="popover-icon-label cur_P"
    ref="pLael"
  >
    <bp-icon name="checked"></bp-icon>
    <bpPopver
      :bind="$refs['pLael']"
      direction="top"
      trigger="hover"
    >
      <slot></slot>
    </bpPopver>
  </label>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from 'vue-property-decorator';
import bpui from 'bpui.js';

@Component({
  components: { bpPopver: bpui.bpPopover },
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
  @Prop({ type: String, default: '' }) content: string | undefined;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
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
    // console.log(this);
  }
}
</script>
