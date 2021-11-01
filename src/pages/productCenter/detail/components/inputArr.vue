<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:58
* Desc: inputArr通用组件
* prop : v-model =>  [{}] ,  preWidth => resetleftWidth ,  readOnly :true|false
* slot : default
*/
 -->
 <style lang='scss'>
.input_box {
  // .bp-input__inner {
  //   background: #dcdcdc !important;
  // }
  .input_arr_select {
    .el-input__inner {
      min-width: inherit !important;
    }
  }
  .arr_head {
    background: #f1f1f1;
  }
  .add-icon {
    color: #ff3b30;
    margin-right: 5px;
    cursor: pointer;
  }
  .remove-icon {
    color: #1baaf5;
    margin-right: 5px;
    cursor: pointer;
  }
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
      :style="{ width: $attrs.preWidth || 230 + 'px' }"
      >{{ $attrs.label }}</label
    >
    <div
      class="form-inner"
      :style="{ width: $attrs.suffixWidth || 570 + 'px' }"
    >
      <div class="flex_r_s arr_head">
        <bp-icon name=""></bp-icon>
        <span class="flex1">{{ options.keyName }}</span>
        <span class="flex1">{{ options.valueName }}</span>
      </div>
      <div
        class="arr_item flex_r_s mt10"
        v-for="(item, index) in relVal"
        :key="index"
      >
        <bp-icon
          name="remove"
          class="add-icon"
          v-show="!readOnly"
          @click="removeObj(index)"
        ></bp-icon>
        <!--  type = input -->
        <template v-if="type == 'input'">
          <bp-input
            class="flex1"
            :disabled="readOnly"
            v-model="item[options.key]"
            @change="handleChange"
          ></bp-input>
          <bp-input
            class="flex1"
            :disabled="readOnly"
            v-model="item[options.value]"
            @change="handleChange"
          ></bp-input>
        </template>
        <!--  type = select -->
        <template v-if="type == 'select'">
          <ui-select-el
            class="input_arr_select flex1"
            v-model="item[options.key]"
            @change="
              (e) => {
                selectChange(item, e);
              }
            "
          >
            <ui-option
              :key="index"
              :label="node[options.selectLable]"
              :value="node[options.selectValue]"
              v-for="(node, index) in selectOptions"
            ></ui-option>
          </ui-select-el>
          <bp-input
            class="flex1"
            :disabled="readOnly"
            v-model="item[options.value]"
            @change="handleChange"
          ></bp-input>
        </template>
      </div>
      <!-- add btn-->
      <div class="arr_item flex_r_s mt5" v-show="!readOnly">
        <bp-icon name="add" @click="addObj" class="remove-icon"></bp-icon>
        <span>{{ $i18n('productCenter.detail.components.inputArr.新增') }}</span>
      </div>
      <p class="mt10"></p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import bpui from "bpui.js";

interface options {
  key: string;
  value: string;
  selectLable?: string;
  selectValue?: string;
  keyName: string;
  valueName: string;
}

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
  @Prop({ default: [] })
  value!: any[];

  @Prop({ default: false }) readOnly?: boolean; // 编辑|只读模式
  @Prop({ default: true }) isRequire?: boolean; // 必填
  @Prop({
    default: { key: "", value: "", keyName: $i18n('productCenter.detail.components.inputArr.键'), valueName: $i18n('productCenter.detail.components.inputArr.值') },
  })
  options!: options; //
  @Prop({ default: "input" }) type?: "input" | "select"; // 类型、默认input
  @Prop({
    default() {
      return [];
    },
  })
  selectOptions?: any;
  @Prop({
    default() {
      return;
    },
  })
  mapFilter: any;

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

  //
  // lifecycle hook.
  constructor() {
    super();
  }
  addObj() {
    if (this.readOnly) {
      return;
    }
    let key1 = this.options.key;
    let key2 = this.options.value;
    let temObj: any = {};

    temObj[key1] = "";
    temObj[key2] = "";
    this.relVal.push(temObj);
  }
  removeObj(index: number) {
    if (this.readOnly) {
      return;
    }
    this.relVal.splice(index, 1);
  }
  handleChange() {
    this.$emit("input", this.relVal);
  }
  selectChange(item: any, e: any) {
    let temobj = this.mapFilter(e);
    Object.assign(item, temobj);
    this.$emit("input", this.relVal);
  }

  mounted() {}
}
</script>
