<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:47
* Desc: 应用详情 日志
*/
 -->
 <style lang='scss' scoped>
.app-detail-console {
  .console-inner {
    height: 500px;
    overflow-y: auto;
    padding: 15px;
    color: #8f97a3;
    background: #242a2e;
  }
}
</style>

<template>
  <ui-card
    class="app-detail-console"
    style="padding: 15px 0"
    v-if="updateParams.appId"
  >
    <div class="flex_r_s" style="padding: 0 15px">
      <span>{{ $i18n('productCenter.detail.components.appConsole.开始查询时间：') }}</span>
      <ui-date-picker
        v-model="consoleParams.startTime"
        type="datetime"
        :placeholder="$i18n('productCenter.detail.components.appConsole.选择开始查询时间')"
        @change="dateChange"
      >
      </ui-date-picker>
      <span class="flex1"></span>
      <button class="bp-btn faas-btn-primary">{{ $i18n('productCenter.detail.components.appConsole.下载') }}</button>
    </div>
    <div class="console-inner mt10">
      <p v-for="(tem, index) in logMessages" :key="index">
        {{ tem }}
      </p>
      <p
        v-show="!!consoleParams.next"
        class="flex_r_c mt20 cur_P"
        @click="getConsole"
      >
{{ $i18n('productCenter.detail.components.appConsole.加载更多___') }}
      </p>
    </div>
  </ui-card>
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

import api from "@/api";
import app from "@/api/app";

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
  @Prop({}) updateParams!: any;

  //
  // data.
  // @Provide() demo:number = 1;
  logMessages = [];
  time1 = "";

  consoleParams = {
    app: "",
    startTime: "",
    endTime: "",
    next: "",
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
    this.consoleParams.app = this.updateParams.appId;
    this.getConsole();
  }
  dateChange(e) {

    this.consoleParams.startTime = (
      this.consoleParams.startTime as any
    ).getTime();
    this.consoleParams.next = "";
    this.getConsole();
  }
  getConsole() {
    api.ars.ars.getAppLog(this.consoleParams).then((result: any) => {
      if (this.consoleParams.next == "") {
        this.logMessages = result.messages;
      } else {
        this.logMessages = [...this.logMessages, ...(result.messages || [])];
      }

      this.consoleParams.next = result.next || "";
      console.log(result);
    });
  }

  mounted() {}
}
</script>
