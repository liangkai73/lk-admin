<!--
/**
* Copyright (c) 2020 Copyright Originforest All Rights Reserved.
* Author: lanck
* Date: 2020-09-29 14:17
* Desc: 编辑策略
*/
 -->

<template>
  <content-view
    class="resource-create"
    :title="$i18n('ram.permission.create2.创建自定义权限策略')"
    :showBack="true"
    :gutter="false"
  >
    <ui-card style="padding: 10px 20px">
      <p class="create-title">{{ $i18n('ram.permission.create2.策略名称') }}</p>
      <bpInput class="create-input" v-model="resourceParams.title"></bpInput>
      <p class="create-title">{{ $i18n('ram.permission.create2.策略code') }}</p>
      <bpInput class="create-input" v-model="resourceParams.code"></bpInput>
      <p class="create-title">{{ $i18n('ram.permission.create2.描述') }}</p>
      <bpInput
        class="create-input"
        :rows="4"
        type="textarea"
        v-model="resourceParams.description"
      ></bpInput>
      <p class="create-title">{{ $i18n('ram.permission.create2.策略内容') }}</p>
      <div class="mt10">
        <uiEditor v-model="resourceParams.statement" ref="editor"></uiEditor>
      </div>
      <div class="line1"></div>
      <p class="mt20"></p>
      <ui-button primary @click="handlepostResource">
{{ $i18n('ram.permission.create2.确定') }}
      </ui-button>
    </ui-card>
  </content-view>
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

import bpui from "bpui.js";
import api from "@/api";
import contentView from "@/components/layout/contentView.vue";
import uiEditor from "@/components/ui/uiEditor.vue";

@Component({
  components: {
    contentView,
    bpInput: bpui.bpInput,
    uiEditor,
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
  resourceParams = {
    title: "", // 资源名称
    code: "", // 策略code
    statement: "", // 资源表达式
    description: "", // 资源描述
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
  created() {
    let demo = [
      {
        obj:
          {ui: {"overview": {"allow": ["*"],"deny": ["warn","setting"]},"console": {"allow": ["*"],"deny": ["warn","setting"]},"cam": {"allow": ["*"],"deny": ["warn","setting"]}}},
      },
      { obj: "api:*:.*", act: ".*", eft: "allow" },
    ];
    this.resourceParams.statement = JSON.stringify(demo, null, 3);
  }
  mounted() {}
  handlepostResource() {
    // console.log(this.json);
    // let str = (this.$refs.editor as any).getValue();
    api.policy.postPolicy(this.resourceParams).then((res: any) => {
      $UIToast({
        type: "success",
        content: $i18n('ram.permission.create2.创建成功'),
      });
      this.$timer.setTimeout(() => {
        this.$navbar.push({
          path: "/ram/permission",
        });
      }, 500);
    });
  }
}
</script>

<style lang="scss" >
.resource-create {
  .create-title {
    color: #8c8c8c;
  }
  .create-input {
    min-height: 40px;
    width: 600px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
