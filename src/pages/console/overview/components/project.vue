<!--
/**
* Copyright (c) 2021 Copyright of All Rights Reserved.
* Author: lanck
* Date: 2021-07-15 13:48
* Desc: index-近期消费项目
*/
 -->
 <style lang="scss" scoped>
.enpenses-item {
  padding: 15px;
  height: 100%;
  .enpenses-item-title {
    font-size: 14px;
    font-weight: 500;
  }
}
.project-item {
  .project-list-item {
    height: 40px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 12px;
    padding: 0 15px;
    &:last-child {
      border-bottom: 1px solid transparent;
    }
  }
}
</style>

<template>
  <ui-card class="enpenses-item project-item">
    <p class="enpenses-item-title flex_r_s">
      <span>{{ $i18n('console.overview.components.project.近期消费项目') }}</span>
      <span class="flex1"></span>
      <span
        v-show="false"
        class="curP"
        style="font-size: 12px; color: #0077ff; font-weight: normal"
        >{{ $i18n('console.overview.components.project.更多') }}</span
      >
    </p>
    <div class="project-list mt10">
      <p
        class="project-list-item flex_r_s"
        v-for="item in projectList"
        :key="item.orderId"
      >
        <span>{{ item.productType }}</span>
        <span class="flex1"> </span>
        <span style="color: #666">{{ $i18n('console.overview.components.project.￥') }}{{ item.pretaxAmount }}</span>
      </p>
    </div>
  </ui-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  // Prop,
  // Watch,
  Provide,
  Inject,
  // Emit,
} from "vue-property-decorator";

import api from "@/api";
import filter from "@/filters";

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
  // @Prop({ type: number }) demo: number;
  // @Inject() readonly cloudProvider!: string;
  @Inject("ProvideObj") readonly ProvideObj!: any;
  //
  // data.
  // @Provide() demo:number = 1;
  getProjectParams = {
    createTimeStart: "",
    pageNum: 1,
    pageSize: 5,
    spAcctId: "",
  };

  projectList = [];

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

  getProjectList(params) {
    api.cmp.expenses.getuserorder(params).then((result) => {
      this.projectList = result.list;
    });
  }
  init() {
    let date1 = new Date().getTime() - 30 * 24 * 3600 * 1000;

    this.getProjectParams.createTimeStart = filter.dateToISOString(date1);

    this.getProjectParams.spAcctId = this.ProvideObj.activeAcct || "";
    this.getProjectList(this.getProjectParams);
  }
  created() {
    // this.init();
  }

  mounted() {}
}
</script>
