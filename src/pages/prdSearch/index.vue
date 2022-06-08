<!--
/**
* Copyright (c) 2022 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2022-03-28 11:07
* Desc:  HWM202203001
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

    <div class="mt20 query-result" v-if="queryData.batchName">
      <p style="font-size: 16px; font-weight: 600">基础信息:</p>
      <p class="mt20 flex_r_s">
        <span class="result-item-title">批次名称</span>

        <span>{{ queryData.batchName }}</span>
        <span class="flex1"></span>
      </p>
      <p class="mt5 flex_r_s">
        <span class="result-item-title">产品品牌</span>

        <span>{{ queryData.prdBrand }}</span>
        <span class="flex1"></span>
      </p>
      <p class="mt5 flex_r_s">
        <span class="result-item-title">生产日期</span>

        <span>{{ queryData.prdDate }}</span>
        <span class="flex1"></span>
      </p>
      <p class="mt5 flex_r_s">
        <span class="result-item-title">生产厂商</span>

        <span>{{ queryData.prdFactory }}</span>
        <span class="flex1"></span>
      </p>
      <p class="mt5 flex_r_s">
        <span class="result-item-title">产品名称</span>

        <span>{{ queryData.prdName }}</span>
        <span class="flex1"></span>
      </p>
      <template v-if="queryData.prdExtraArr.length > 0">
        <p
          class="mt5 flex_r_s"
          v-for="(item, index) in queryData.prdExtraArr"
          :key="index"
        >
          <span class="result-item-title">{{ item.name }}</span>

          <span>{{ item.val }}</span>
          <span class="flex1"></span></p
      ></template>
      <p class="mt10"></p>
      <p class="line1"></p>
      <template v-if="queryData.prdStageArr.length > 0">
        <p class="mt20" style="font-size: 16px; font-weight: 600">
          批次阶段信息:
        </p>
        <p class="mt20"></p>
        <div
          class="stage-item mt10"
          v-for="(item, index) in queryData.prdStageArr"
          :key="item.stageId"
        >
          <div class="flex_r_s">
            <div style="width: 300px" class="flex_r_s">
              <h3 style="font-size: 14px">{{ index + 1 }}:</h3>
              <h3 style="padding: 0 20px; font-size: 14px">
                {{ item.stageName }}
              </h3>
              <span>({{ item.stageDate }}) </span>
              <span class="flex1"></span>
            </div>
            <p class="stage-item-content flex1">{{ item.stageContent }}</p>
          </div>
        </div>
        <p class="mt20"></p>
      </template>
    </div>
    <div v-show="queryData.batchName === null">
      <div class="query-result-null mt20 flex_r_c">
        <span style="color: #999">暂无查询内容</span>
      </div>
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
  width: 100%;
  border: 1px solid #dadce0;
  padding: 20px 30px;
  .result-item-title {
    color: #666;
    width: 300px;
  }
  .stage-item {
    border: 1px solid #dadce0;
    padding: 15px 30px;
  }
}
.query-result-null {
  width: 100%;
  height: 550px;
  border: 1px solid #dadce0;
}
</style>
