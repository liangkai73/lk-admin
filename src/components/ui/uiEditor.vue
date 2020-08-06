<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-10-22 14:44
* Desc: 在线代码编译器
* 支持多语言 
*/
 -->
<style lang="scss" scoped>
.bp-editor {
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  min-width: 600px;
  width: 100%;
  height: 500px;
}
</style>
<template>
  <div :style="style" class="bp-editor"></div>
</template>

<script lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
// import "monaco-editor/esm/vs/language/json/monaco.contribution.js";
import "monaco-editor/esm/vs/editor/editor.main.js";
import {
  Component,
  Vue,
  Prop,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";
interface renderOption {
  style?: object;
  template: string;
}

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
  temClass: any = null;
  monacoInstance: any = null;
  style = {};

  language = "javascript";
  //
  // Prop
  @Prop({ type: Boolean, default: false }) async!: boolean;
  @Prop({ type: String, default: "hello world!" }) value!: string;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }
  get uidClass() {
    return "editor" + (this as any)._uid;
  }
  get relVal() {
    return this.value;
  }
  set relVal(val) {
    this.$emit("input", val);
    return;
  }
  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  // 初始化参数
  initData(option?: any) {
    // let { value, style, language } = option || {};
    // style && (this.style = style);
    // value && (this.value = value);
    // language && (this.language = language);
  }
  // 创建实例
  createInstance() {
    let el: any = this.$el;
    this.monacoInstance = monaco.editor.create(el, {
      value: this.value,
      language: "json",
    });
    return Promise.resolve(this.monacoInstance);
  }
  // 获取代码
  getValue() {
    return this.monacoInstance.getValue();
  }
  // 销毁实例
  destoryInstance() {
    this.monacoInstance && this.monacoInstance.dispose();
  }
  // 异步渲染函数
  asyncRender(option: any) {
    this.initData(option);
    this.createInstance();
  }
  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {
    console.log(this.$props);
    // window.temVm = this;
    // this.initData({});
    this.createInstance().then((result: any) => {
      this.monacoInstance.onDidChangeModelContent((event: any) => {
        this.relVal = this.getValue();
      });
    });
  }

  beforedestroy() {
    this.destoryInstance();
  }
}
</script>
