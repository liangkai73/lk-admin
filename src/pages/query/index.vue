<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-28 11:07
* Desc:
*/
 -->

<template>
  <contentView :title="'编码查询'">
    <p class="mt20 flex_r_s">
      <bp-input
        class="mt10 inner-input"
        style="width: 500px; margin-right: 100px"
        v-model="code"
        :placeholder="$i18n('请输入编码')"
      ></bp-input>

      <button
        class="bp-btn faas-btn-primary"
        style="width: 100px"
        :disabled="!code"
        @click="getCodeQuery"
      >
        查询
      </button>
    </p>

    <div
      class="mt20 query-result"
      style="width: 600px"
      v-if="queryData.batchName"
    >
      <p class="mt10">查询结果：</p>
      <p class="mt10 flex_r_s">
        <span>批次名称</span>
        <span class="flex1"></span>
        <span>{{ queryData.batchName }}</span>
      </p>
      <p class="mt10 flex_r_s">
        <span>产品品牌</span>
        <span class="flex1"></span>
        <span>{{ queryData.prdBrand }}</span>
      </p>
      <p class="mt10 flex_r_s">
        <span>生产日期</span>
        <span class="flex1"></span>
        <span>{{ queryData.prdDate }}</span>
      </p>
      <p class="mt10 flex_r_s">
        <span>生产厂商</span>
        <span class="flex1"></span>
        <span>{{ queryData.prdFactory }}</span>
      </p>
      <p class="mt10 flex_r_s">
        <span>产品名称</span>
        <span class="flex1"></span>
        <span>{{ queryData.prdName }}</span>
      </p>
      <template v-if="queryData.prdExtraArr.length > 0">
        <p
          class="mt10 flex_r_s"
          v-for="(item, index) in queryData.prdExtraArr"
          :key="index"
        >
          <span>{{ item.name }}</span>
          <span class="flex1"></span>
          <span>{{ item.val }}</span>
        </p></template
      >
      <template v-if="queryData.prdStageArr.length > 0">
        <p class="mt20">批次阶段信息:</p>
        <div
          class="stage-item mt10"
          v-for="(item, index) in queryData.prdStageArr"
          :key="item.stageId"
        >
          <div class="flex_r_s">
            <h3>{{ index + 1 }}:</h3>
            <h3 style="padding: 0 20px">{{ item.stageName }}</h3>
            <span>({{ item.stageDate }}) </span>
            <span class="flex1"></span>
          </div>
          <p class="stage-item-content mt10">{{ item.stageContent }}</p>
        </div>
      </template>
    </div>
    <div v-show="queryData.batchName === null">
      <p class="mt20">- 暂无编码信息</p>
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
import bpui from "bpui.js";
import contentView from "@/components/layout/contentView.vue";
import api from "@/api";

@Component({
  components: { contentView, bpInput: bpui.bpInput },
})
export default class extends Vue {
  //
  // event.
  // @Emit()
  // demoEvent(type: string) { }

  //
  // state.
  // @State(state=>state.demo) demo:DEMO_TYPE;
  code = "";
  queryData = {};

  //
  // Prop
  // @Prop({ type: number }) demo: number;

  //
  // data.
  // @Provide() demo:number = 1;

  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  getCodeQuery() {
    api.act.getTrace(this.code).then((res) => {
      console.log(res);
      this.queryData = res;
      console.log(this.queryData);
    });
  }
  //
  // lifecycle hook.
  constructor() {
    super();
  }

  mounted() {}
}
</script>
<style lang="scss" >
.query-result {
  // background: #ccc;
  padding: 10px;
}
</style>
