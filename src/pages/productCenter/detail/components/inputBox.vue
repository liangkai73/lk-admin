<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:58
* Desc: input通用组件
* prop : v-model => input , :type =>input ,  preWidth => resetleftWidth ,  readOnly :true|false
* slot : default
*/
 -->
 <style lang='scss'>
.input_box {
  // .bp-input__inner {
  //   background: #dcdcdc !important;
  // }
  .input_require {
    &:before {
      content: "*";
      color: red;
      display: inline-block;
      padding-right: 3px;
      font-size: 16px;
      position: relative;
      top: 3px;
    }
  }
}
</style>

<template>
  <div class="faas-text-row input_box mt5">
    <label
      class="form-label"
      :class="[{ input_require: isRequire }]"
      :style="{ width: $attrs.preWidth ? `${$attrs.preWidth}px` : `230px` }"
      :for="'input_box' + _uid"
      >{{ $attrs.label }}</label
    >
    <div class="form-inner">
      <template v-if="!$slots.default">
        <bpInput
          :type="$attrs.type"
          min="0"
          :class="[...$attrs.inputClass]"
          :style="{
            width: $attrs.suffixWidth ? `${$attrs.suffixWidth}px` : `570px`,
          }"
          :id="'input_box' + _uid"
          v-model="relVal"
          v-show="!readOnly"
        ></bpInput>
        <span v-show="readOnly" style="padding: 0 15px">
          {{ relVal }}
        </span>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
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

import bpui from "bpui.js";

@Component({
  components: {
    bpInput: bpui.bpInput,
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

  // G
  // Prop
  @Prop({ default: undefined })
  value: string | number | null | undefined;

  @Prop({ default: false }) readOnly?: boolean; // 编辑|只读模式
  @Prop({ default: true }) isRequire?: boolean; // 必填
  //   @Prop({ type: String, default: undefined }) label?: string; //  label
  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  get relVal() {
    return this.value;
  }
  set relVal(val) {
    this.$emit("input", val);
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

  mounted() {}
}
</script>
