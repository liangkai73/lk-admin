<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 15:47
* Desc: 新建app应用
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content app-create"
    :title="$i18n('productCenter.create.index.应用名')"
    :showBack="true">
    <ui-card>
      <div class="flex_r_c mt5">
        <ui-step :active="stepNum" :stepArr="stepArr"></ui-step>
      </div>

      <!-- page1 -->
      <div class="mt15" v-show="stepNum == 0">
        <h4>{{ $i18n('productCenter.create.index.基本信息') }}</h4>
        <input-box
          :label="$i18n('productCenter.create.index.应用名称')"
          class="mt15"
          v-model="appParams.name"></input-box>
        <input-box
          :label="$i18n('productCenter.create.index.版本号')"
          class="mt15"
          v-model="appParams.version"
          :readOnly="true"></input-box>
        <input-box :label="$i18n('productCenter.create.index.所属分组')" class="mt15">
          <ui-select-el :placeholder="$i18n('productCenter.create.index.请选择')" v-model="appParams.catalogId">
            <ui-option
              :key="'key1' + index"
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in siteGroups"></ui-option>
          </ui-select-el>
        </input-box>
        <input-box :label="$i18n('productCenter.create.index.运行语言环境')" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="appParams.runtimeId"
            @change="chsoseRuntime">
            <ui-option
              :key="'key2' + index"
              :label="item.runtime"
              :value="item.id"
              v-for="(item, index) in runTimeList"></ui-option>
          </ui-select-el>
        </input-box>
        <input-box :label="$i18n('productCenter.create.index.备注')" class="mt15" :isRequire="false">
          <bp-input
            type="textarea"
            rows="4"
            style="width: 570px"
            v-model="appParams.description"></bp-input>
        </input-box>
        <p class="mt20"></p>
      </div>
      <!-- page2 -->
      <div class="mt15" v-show="stepNum == 1">
        <h4>{{ $i18n('productCenter.create.index.配置环境') }}</h4>
        <input-box label="CPU" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="appParams.limitCpu"
            style="width: 100%">
            <ui-option
              :key="'key7' + index"
              :label="item.optionName | addSpace"
              :value="item.optionVal"
              v-for="(item, index) in cpuTypes"></ui-option>
          </ui-select-el>
        </input-box>
        <input-box :label="$i18n('productCenter.create.index.内存')" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="appParams.limitMem"
            style="width: 100%">
            <ui-option
              :key="'key8' + index"
              :label="item.optionName | addSpace"
              :value="item.optionVal"
              v-for="(item, index) in memTypes"></ui-option>
          </ui-select-el>
        </input-box>

        <input-box :label="$i18n('productCenter.create.index.服务器')" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="appParams.serverInfoId"
            style="width: 100%"
            @change="filterDns">
            <ui-option
              :key="'key9' + index"
              :label="item.clusterName"
              :value="item.id"
              v-for="(item, index) in clusterList"></ui-option>
          </ui-select-el>
        </input-box>

        <input-arr
          :label="$i18n('productCenter.create.index.域名')"
          class="mt15"
          v-if="
            appParams.serverInfoId.length > 0 && dnsList.length > 0 && showDns
          "
          :isRequire="false"
          :options="{
            key: 'domainName',
            value: 'subDomain',
            selectLable: 'domainName',
            selectValue: 'id',
            keyName: $i18n('productCenter.create.index.主机记录'),
            valueName: $i18n('productCenter.create.index.域名'),
          }"
          :type="'select'"
          :selectOptions="dnsList"
          v-model="appParams.domains"
          :mapFilter="filter1"></input-arr>
        <!-- {{ dnsList }} -->
        <input-arr
          :label="$i18n('productCenter.create.index.存储')"
          class="mt15"
          v-if="appParams.serverInfoId.length > 0 && storageList.length > 0"
          :isRequire="false"
          :options="{
            key: 'storageName',
            value: 'mountPath',
            selectLable: 'name',
            selectValue: 'name',
            keyName: $i18n('productCenter.create.index.规格'),
            valueName: $i18n('productCenter.create.index.路径'),
          }"
          :type="'select'"
          :selectOptions="storageList"
          v-model="appParams.storages"></input-arr>
        <input-arr
          :label="$i18n('productCenter.create.index.环境变量')"
          class="mt15"
          :isRequire="false"
          :options="{
            key: 'key',
            value: 'value',
            keyName: $i18n('productCenter.create.index.变量名'),
            valueName: $i18n('productCenter.create.index.变量值'),
          }"
          v-model="appParams.envs"></input-arr>
        <input-arr
          :label="$i18n('productCenter.create.index.host映射')"
          class="mt15"
          :isRequire="false"
          :options="{
            key: 'ip',
            value: 'domain',
            keyName: $i18n('productCenter.create.index.IP地址'),
            valueName: $i18n('productCenter.create.index.域名'),
          }"
          v-model="appParams.hosts"></input-arr>
        <input-box
          :label="$i18n('productCenter.create.index.服务端口')"
          v-model="appParams.appPort"
          class="mt15"
          type="int"
          ref="appPort"></input-box>
        <input-box :label="$i18n('productCenter.create.index.镜像仓库')" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="appParams.codeRepoId"
            style="width: 100%">
            <ui-option
              :key="'key10' + index"
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in RepoTypes"></ui-option>
          </ui-select-el>
        </input-box>

        <input-box
          :label="$i18n('productCenter.create.index.副本数量')"
          v-model="appParams.replicas"
          type="int"
          class="mt15"
          ref="replicas"></input-box>
      </div>
      <div class="mt15" v-show="stepNum == 1">
        <div class="flex_r_s">
          <h4>{{ $i18n('productCenter.create.index.健康检查') }}</h4>
          <span class="flex1"></span>
          <bp-switch v-model="healthSwitch"></bp-switch>
        </div>
        <div v-if="healthSwitch">
          <input-box :label="$i18n('productCenter.create.index.检查方式')" class="mt15">
            <bpRadio v-model="appParams.healthCheck.proto" value="http">HTTP</bpRadio>
          </input-box>
          <input-box
            :label="$i18n('productCenter.create.index.启动检查时间')"
            class="mt15"
            v-model="appParams.healthCheck.initialDelaySeconds"></input-box>
          <input-box
            :label="$i18n('productCenter.create.index.检测时间间隔')"
            class="mt15"
            v-model="appParams.healthCheck.beatPeriod"></input-box>
          <input-box
            :label="$i18n('productCenter.create.index.端口')"
            class="mt15"
            v-model="appParams.healthCheck.specHttpPort"></input-box>
          <input-box
            :label="$i18n('productCenter.create.index.路径')"
            class="mt15"
            v-model="appParams.healthCheck.specHttpPath"></input-box>
          <input-arr
            :label="$i18n('productCenter.create.index.请求头')"
            class="mt15"
            :isRequire="false"
            :options="{
              key: 'name',
              value: 'value',
              keyName: $i18n('productCenter.create.index.属性'),
              valueName: $i18n('productCenter.create.index.值'),
            }"
            v-model="appParams.healthCheck.specHttpHeaders"></input-arr>
        </div>

        <p class="mt20"></p>
      </div>
      <!-- page3 -->
      <div class="mt15" v-show="stepNum == 2">
        <h4>{{ $i18n('productCenter.create.index.配置代码') }}</h4>

        <input-box :label="$i18n('productCenter.create.index.上传方式')" class="mt15">
          <ui-select-el
            :placeholder="$i18n('productCenter.create.index.请选择')"
            v-model="temuploadType"
            style="width: 100%">
            <ui-option
              :key="'key3' + index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disable"
              v-for="(item, index) in uploadTypes"></ui-option>
          </ui-select-el>
        </input-box>
        <input-box label="" class="mt15" :isRequire="false">
          <ui-upload
            @uploadSuccess="uploadSuccess"
            @getPercentage="getPercentage">
            <div class="flex_r_s" style="width: 400px">
              <button class="bp-btn faas-btn-primary">{{ $i18n('productCenter.create.index.选择文件包') }}</button>
              <span class="flex1"></span>
              <span v-show="percentageShow">{{ percentage }}</span>
              <span v-show="appParams.codeFileId" style="color: #0acd7f">{{ $i18n('productCenter.create.index.上传成功') }}</span>
            </div>
          </ui-upload>
        </input-box>
      </div>
      <p class="mt20"></p>
      <div class="flex_r_s">
        <span class="flex1"></span>
        <button
          class="bp-btn faas-btn-primary"
          v-show="stepNum == 0"
          @click="stepTo(1, 'next')">
          {{ $i18n('productCenter.create.index.下一步:环境配置') }}
        </button>
        <button
          class="bp-btn faas-btn-primary"
          v-show="stepNum == 1"
          @click="stepTo(0)">
          {{ $i18n('productCenter.create.index.上一步:基本信息') }}
        </button>
        <button
          class="bp-btn faas-btn-primary"
          v-show="stepNum == 1"
          @click="stepTo(2, 'next')">
          {{ $i18n('productCenter.create.index.下一步:配置代码') }}
        </button>
        <button
          class="bp-btn faas-btn-primary"
          v-show="stepNum == 2"
          @click="stepTo(1)">
          {{ $i18n('productCenter.create.index.上一步:环境配置') }}
        </button>
        <button
          class="bp-btn faas-btn-primary"
          @click="postApp"
          :disabled="stepNum != 2 || appParams.codeFileId.length == 0">
          {{ $i18n('productCenter.create.index.新建应用') }}
        </button>
      </div>
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

import contentView from "@/components/layout/contentView.vue";
import uiStep from "@/components/ui/uiStep2.vue";
import uiUpload from "@/components/ui/uiploader.vue";
import inputBox from "../detail/components/inputBox.vue";
import inputArr from "../detail/components/inputArr.vue";
import bpui from "bpui.js";
import api from "@/api";

// types
import { App } from "@/api/app/types";
import { connect } from "echarts";
import cmp from "@/api/cmp";

@Component({
  components: {
    contentView,
    uiStep,
    uiUpload,
    inputBox,
    inputArr,
    bpInput: bpui.bpInput,
    bpSwitch: bpui.bpSwitch,
    bpRadio: bpui.bpRadio,
  },
  filters: {
    addSpace(val) {
      return val.replace(/(\d+)/g,"$1 ")
    }
  }
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
  // @Provide() demo:number = 1;
  stepNum = 0;
  stepArr = [
    { lable: $i18n('productCenter.create.index.基本信息'), sum: 0 },
    { lable: $i18n('productCenter.create.index.环境配置'), sum: 1 },
    { lable: $i18n('productCenter.create.index.配置代码'), sum: 2 },
  ];
  healthSwitch = false;
  showDns = false;
  //   上传方式集合
  uploadTypes = [
    {
      value: 1,
      label: $i18n('productCenter.create.index.本地文件包上传'),
      disable: false,
    },
    {
      value: 2,
      label: $i18n('productCenter.create.index.指定git仓库'),
      disable: true,
    },
  ];
  temuploadType = 1;

  siteGroups = [];
  runTimeList = [];
  clusterList = [];
  RepoTypes = [];

  cpuTypes = [];
  memTypes = [];
  dnsList = [];
  storageList = [];
  percentage = "";
  percentageShow = true;

  appParams: App.appParams = {
    name: "", // 名称
    description: "", // 应用描述
    deploy: true, //  是否立即部署
    version: "1.0", // 应用版本
    catalogId: "", // 服务组ID
    runtimeId: "", // 应用运行时ID
    codeFileId: "", // 上传的代码包ID
    codeRepoId: "", // 镜像仓库ID
    serverInfoId: "", // 部署服务器ID
    replicas: 1, // 副本数
    appDomain: "", // 应用域名
    appPort: 8080, // 应用端口
    domains: [], // 域名
    envs: [], // 环境变量集合
    hosts: [], // Host配置集合
    storages: [], // 存储配置集合
    limitCpu: "", // CPU上限
    limitMem: "", // 内存上限
    healthCheck: {
      beatPeriod: 0,
      initialDelaySeconds: 0,
      proto: "http",
      specHttpPort: 0,
      specHttpMethod: "",
      specHttpPath: "",
      specHttpHeaders: [],
    }, //
  };

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
  // 获取分组列表
  _getGroupList() {
    api.app.getCatalog().then((result: any) => {
      this.siteGroups = result;
      // 默认选择最后一个分组
      if (result.length > 0) {
        this.appParams.catalogId = result[result.length - 1].id;
      }
    });
  }
  // 获取语言环境
  _getRuntimeList() {
    api.app.getRuntimeList().then((result: any) => {
      this.runTimeList = result;
      // 默认选择最后一个语言环境
      if (result.length > 0) {
        this.$timer.setTimeout(() => {
          this.appParams.runtimeId = result[result.length - 1].id;
          return this.chsoseRuntime(result[result.length - 1].id);
        }, 1000);
      }
    });
  }
  // 获取服务器列表
  _getClusterList() {
    api.app.getClusterList().then((result: any) => {
      this.clusterList = result;
      if (result.length > 0) {
        this.appParams.serverInfoId = result[0].id;
        this.filterDns(result[0].id);
      }
    });
  }
  // 获取设备容器信息列表
  _getSemItemspecList() {
    api.app.getSemItemspec().then((result: any) => {
      this.cpuTypes = result.VCPU.options;
      this.memTypes = result.VMEM.options;
    });
  }
  // 获取镜像仓库列表
  _getClusterRepoList() {
    api.app.getClusterRepoList().then((result: any) => {
      this.RepoTypes = result;
      if (result.length > 0) {
        this.appParams.codeRepoId = result[0].id;
      }
    });
  }
  // 选择语言环境
  chsoseRuntime(val: any) {
    let activeItemArr = this.runTimeList.filter((item: any) => {
      return item.id == val;
    });
    this._filterCPU(activeItemArr[0]);
  }
  // 过滤CPU - MEM 的list
  _filterCPU(item: any) {
    let minCpu = item.requestCpu * 1;
    let minMem = item.requestMem * 1;
    this.cpuTypes = this.cpuTypes.filter((item: any) => {
      return item.optionVal * 1 >= minCpu;
    });
    this.memTypes = this.memTypes.filter((item: any) => {
      return item.optionVal * 1 >= minMem;
    });
    if (this.cpuTypes.length > 0) {
      this.appParams.limitCpu = (this.cpuTypes[0] as any).optionVal;
    }
    if (this.memTypes.length > 0) {
      this.appParams.limitMem = (this.memTypes[0] as any).optionVal;
    }
  }
  // 过滤dns
  filterDns(e: any) {
    let temObj = this.clusterList.filter((node: any) => {
      return node.id == e;
    });
    // 请求存储空间
    this._getStorege((temObj[0] as any).clusterId);

    if (temObj[0] && (temObj[0] as any).gatewayEndpoint == null) {
      this.showDns = false;
    } else {
      this.showDns = true;
    }
  }

  filter1(e: any) {
    let obj: any = this.dnsList.filter((node: any) => {
      return node.id == e;
    });
    console.log(obj);
    return {
      value: "",
      domainName: obj[0].domainName,
      domainAccountId: obj[0].acctId,
      domainRecordId: "",
    };
  }
  // 上传成功回调
  uploadSuccess(data: any) {
    this.appParams.codeFileId = data.id;
    $UIToast({ type: "success", content: $i18n('productCenter.create.index.代码上传成功') });
    this.percentageShow = false;
  }
  // 查询域名解析列表
  _getDnsList() {
    api.cmp.dns.list().then((result: any) => {
      // console.log(result);
      this.dnsList = result;
    });
  }
  // 查询存储列表
  _getStorege(id: any) {
    let params = {
      clusterId: id,
    };
    api.cmp.cluster.pvc(params).then((result: any) => {
      this.storageList = result;
    });
  }
  //   新建应用
  postApp() {
    // 是否启用健康检测
    if (!this.healthSwitch) {
      delete this.appParams.healthCheck;
    }
    api.app.postApp(this.appParams).then((result: any) => {
      // console.log(result);
      $UIToast({ type: "success", content: $i18n('productCenter.create.index.添加成功!') });
      this.$timer.setTimeout(() => {
        this.$navbar.push({ path: "/productCenter" });
      }, 1000);
    });
  }
  // 上传百分比回调
  getPercentage(e: any) {
    this.percentage = e;
  }
  //
  stepTo(num: number, action: "next" | "pre" = "pre") {
    if (num == 1 && action == "next") {
      this.paramsCheck("string", "name", $i18n('productCenter.create.index.应用名称不能为空'));
      this.paramsCheck("string", "version", $i18n('productCenter.create.index.版本号不能为空'));
      this.paramsCheck("string", "catalogId", $i18n('productCenter.create.index.所属分组不能为空'));
      this.paramsCheck("string", "runtimeId", $i18n('productCenter.create.index.运行语言环境不能为空'));
    }
    if (num == 2 && action == "next") {
      this.paramsCheck("string", "limitCpu", $i18n('productCenter.create.index.CPU不能为空'));
      this.paramsCheck("string", "limitMem", $i18n('productCenter.create.index.内存不能为空'));
      this.paramsCheck("string", "serverInfoId", $i18n('productCenter.create.index.服务器不能为空'));
      this.paramsCheck("string", "appPort", $i18n('productCenter.create.index.服务端口不能为空'));
      this.paramsCheck("string", "codeRepoId", $i18n('productCenter.create.index.镜像仓库不能为空'));
      this.paramsCheck("string", "replicas", $i18n('productCenter.create.index.副本数量不能为空'));
    }
    this.stepNum = num;
  }
  // 必填参数校验
  paramsCheck(type: "string", key: string, msg: string) {
    if (type == "string") {
      if ((this.appParams as any)[key].length <= 0) {
        $UIToast({ type: "error", content: msg });
        throw new Error($i18n('productCenter.create.index.参数错误'));
      }
    }
  }
  init() {
    this.stepNum = 0;
    this._getGroupList();
    this._getRuntimeList();
    this._getClusterList();
    this._getSemItemspecList();
    this._getClusterRepoList();
    this._getDnsList();
  }
  created() {
    this.init();
  }
  mounted() {
    // window.app = this.appParams;
    // console.log(this.$refs.appPort.$children[0].$el.children[0]);
    (this.$refs.appPort as any).$children[0].$el.children[0].value = 8080;
    (this.$refs.replicas as any).$children[0].$el.children[0].value = 1;
  }
}
</script>

<style lang='scss'>
.faas-content{
  max-height: calc(100vh - 50px);
  min-height: 0px !important
}
.app-create {
  // input reset
  .el-input__inner {
    min-width: 570px;
    border-radius: 0;
    height: 32px;
    background: #dcdcdc;
    color: #000;
    padding-left: 8px;
  }
  // .el-select .el-input__inner {
  //   min-width: inherit;
  // }
  .el-input__inner::placeholder {
    color: #909399 !important;
  }
  .el-input__icon {
    line-height: 32px !important;
    color: #909399 !important;
  }
}
</style>
