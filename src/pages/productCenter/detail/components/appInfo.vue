n<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:47
* Desc: 应用详情 基本信息
*/
 -->
<style lang='scss'>
.app-detail-info {
  // input reset
  .el-input__inner {
    min-width: 570px;
    border-radius: 0;
    height: 32px;
    background: #dcdcdc;
    color: #000;
    padding-left: 8px;
  }
  .el-input__inner::placeholder {
    color: #909399 !important;
  }
  .el-input__icon {
    line-height: 32px !important;
    color: #909399 !important;
  }
}
</style>

<template>
  <div class="app-detail-info" v-if="appParams.appId">
    <ui-card>
      <h4>{{ $i18n('productCenter.detail.components.appInfo.基本信息') }}</h4>
      <input-box
        :label="$i18n('productCenter.detail.components.appInfo.应用名称')"
        class="mt15"
        v-model="appParams.name"
        :readOnly="true"
      ></input-box>
      <input-box
        :label="$i18n('productCenter.detail.components.appInfo.版本号')"
        class="mt15"
        :readOnly="true"
        v-model="appParams.version"
      ></input-box>
      <input-box :label="$i18n('productCenter.detail.components.appInfo.所属分组')" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appInfo.请选择')"
          v-model="appParams.catalogId"
          :disabled="true"
        >
          <ui-option
            :key="'key1' + index"
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in siteGroups"
          ></ui-option>
        </ui-select-el>
      </input-box>
      <input-box :label="$i18n('productCenter.detail.components.appInfo.运行语言环境')" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appInfo.请选择')"
          v-model="appParams.runtimeId"
          @change="chsoseRuntime"
          :disabled="true"
        >
          <ui-option
            :key="'key2' + index"
            :label="item.runtime"
            :value="item.id"
            v-for="(item, index) in runTimeList"
          ></ui-option>
        </ui-select-el>
      </input-box>
    </ui-card>
    <ui-card>
      <h4>{{ $i18n('productCenter.detail.components.appInfo.配置代码') }}</h4>
      <input-box :label="$i18n('productCenter.detail.components.appInfo.本地文件包上传')" class="mt15" :isRequire="false">
        <ui-upload
          @uploadSuccess="uploadSuccess"
          @getPercentage="getPercentage"
        >
          <div class="flex_r_s" style="width: 400px">
            <button class="bp-btn faas-btn-primary">{{ $i18n('productCenter.detail.components.appInfo.选择文件包') }}</button>
            <span class="flex1"></span>
            <span v-show="percentageShow">{{ percentage }}</span>
            <span v-show="isUploadSuccess" style="color: #0acd7f"
              >{{ $i18n('productCenter.detail.components.appInfo.上传成功') }}</span
            >
          </div>
        </ui-upload>
      </input-box>
    </ui-card>
    <div class="mt20">
      <button class="bp-btn faas-btn-primary" @click="putApp">{{ $i18n('productCenter.detail.components.appInfo.保存') }}</button>
      <!-- <button class="bp-btn faas-btn-black">取消</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
  // Watch,
  // Provide,
  // Emit,
} from "vue-property-decorator";

import inputBox from "./inputBox.vue";
import bpui from "bpui.js";
import api from "@/api";
import uiUpload from "@/components/ui/uiploader.vue";

@Component({
  components: {
    inputBox,
    bpInput: bpui.bpInput,
    uiUpload,
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
  @PropSync("updateParams", { type: Object }) appParams!: string;

  //
  // data.
  // @Provide() demo:number = 1;
  //   上传方式集合
  uploadTypes = [
    {
      value: 1,
      label: $i18n('productCenter.detail.components.appInfo.本地文件包上传'),
      disable: false,
    },
    {
      value: 2,
      label: $i18n('productCenter.detail.components.appInfo.指定git仓库'),
      disable: true,
    },
  ];
  temuploadType = 1;

  siteGroups = [];
  runTimeList = [];

  percentageShow = true;
  percentage = "";
  isUploadSuccess = false;

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

  // 获取分组列表
  _getGroupList() {
    api.app.getCatalog().then((result: any) => {
      this.siteGroups = result;
      //   this.addsiteParams.catalogId =
      //     this.siteGroups.length > 0 ? (this.siteGroups[0] as any).id : "";
    });
  }
  // 获取语言环境
  _getRuntimeList() {
    api.app.getRuntimeList().then((result: any) => {
      this.runTimeList = result;
    });
  }
  // 获取服务器列表
  // _getClusterList() {
  //   api.app.getClusterList().then((result: any) => {
  //     this.clusterList = result;
  //   });
  // }
  // 获取设备容器信息列表
  // _getSemItemspecList() {
  //   api.app.getSemItemspec().then((result: any) => {
  //     this.cpuTypes = result.VCPU.options;
  //     this.memTypes = result.VMEM.options;
  //   });
  // }
  // 获取镜像仓库列表
  // _getClusterRepoList() {
  //   api.app.getClusterRepoList().then((result: any) => {
  //     this.RepoTypes = result;
  //   });
  // }
  // 选择语言环境
  chsoseRuntime(val: any) {
    let activeItemArr = this.runTimeList.filter((item: any) => {
      return item.id == val;
    });
    // this._filterCPU(activeItemArr[0]);
    (this.appParams as any).limitCpu = "";
    (this.appParams as any).limitMem = "";
  }
  // 上传成功回调
  uploadSuccess(data: any) {
    (this.appParams as any).codeFileId = data.id;
    this.isUploadSuccess = true;
    $UIToast({ type: "success", content: $i18n('productCenter.detail.components.appInfo.代码上传成功') });
    this.percentageShow = false;
  }

  // 上传百分比回调
  getPercentage(e: any) {
    this.percentage = e;
  }
  // 过滤CPU - MEM 的list
  // _filterCPU(item: any) {
  //   let minCpu = item.requestCpu * 1;
  //   let minMem = item.requestMem * 1;
  //   this.cpuTypes = this.cpuTypes.filter((item: any) => {
  //     return item.optionVal * 1 >= minCpu;
  //   });
  //   this.memTypes = this.memTypes.filter((item: any) => {
  //     return item.optionVal * 1 >= minMem;
  //   });
  // }
  // // 上传成功回调
  // uploadSuccess(data: any) {
  //   (this.appParams as any).codeFileId = data.id;
  //   $UIToast({ type: "success", content: "代码上传成功" });
  //   // this.percentageShow = false;
  // }
  putApp() {
    api.app
      .putApp((this.appParams as any).appId, this.appParams)
      .then((result: any) => {
        $UIToast({ type: "success", content: $i18n('productCenter.detail.components.appInfo.修改成功！') });
        this.$emit("updataDetail", true);
      });
  }
  init() {
    this._getGroupList();
    this._getRuntimeList();
    // this._getClusterList();
    // this._getSemItemspecList();
    // this._getClusterRepoList();
    // api.app.postApp(this.addsiteParams).then((result: any) => {
    //   console.log(result);
    // });
  }
  created() {
    this.init();
  }

  mounted() {}
}
</script>
