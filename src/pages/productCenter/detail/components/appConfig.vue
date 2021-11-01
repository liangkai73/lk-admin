<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 13:47
* Desc: 应用详情 设置

*/
 -->
 <style lang='scss'>
.app-detail-config {
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
  <div class="app-detail-config" v-if="appParams.appId">
    <ui-card>
      <input-box label="CPU" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appConfig.请选择')"
          v-model="appParams.limitCpu"
          style="width: 100%"
        >
          <ui-option
            :key="'key7' + index"
            :label="item.optionName"
            :value="item.optionVal"
            v-for="(item, index) in cpuTypes"
          ></ui-option> </ui-select-el
      ></input-box>
      <input-box :label="$i18n('productCenter.detail.components.appConfig.内存')" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appConfig.请选择')"
          v-model="appParams.limitMem"
          style="width: 100%"
        >
          <ui-option
            :key="'key8' + index"
            :label="item.optionName"
            :value="item.optionVal"
            v-for="(item, index) in memTypes"
          ></ui-option>
        </ui-select-el>
      </input-box>
      <input-box :label="$i18n('productCenter.detail.components.appConfig.服务器')" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appConfig.请选择')"
          v-model="appParams.serverInfoId"
          style="width: 100%"
          :disabled="true"
          @change="filterDns"
        >
          <ui-option
            :key="'key9' + index"
            :label="item.clusterType"
            :value="item.id"
            v-for="(item, index) in clusterList"
          ></ui-option>
        </ui-select-el>
      </input-box>
      <input-arr
        :label="$i18n('productCenter.detail.components.appConfig.域名')"
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
          keyName: $i18n('productCenter.detail.components.appConfig.主机记录'),
          valueName: $i18n('productCenter.detail.components.appConfig.域名'),
        }"
        :type="'select'"
        :selectOptions="dnsList"
        v-model="appParams.domains"
        :mapFilter="filter1"
      ></input-arr>
      <!-- {{ dnsList }} -->
      <input-arr
        :label="$i18n('productCenter.detail.components.appConfig.存储')"
        class="mt15"
        v-if="appParams.serverInfoId.length > 0 && storageList.length > 0"
        :isRequire="false"
        :options="{
          key: 'storageName',
          value: 'mountPath',
          selectLable: 'name',
          selectValue: 'name',
          keyName: $i18n('productCenter.detail.components.appConfig.规格'),
          valueName: $i18n('productCenter.detail.components.appConfig.路径'),
        }"
        :type="'select'"
        :selectOptions="storageList"
        v-model="appParams.storages"
      ></input-arr>

      <!-- <input-arr
        label="存储"
        class="mt15"
        :isRequire="false"
        :options="{
          key: 'storageName',
          value: 'mountPath',
          keyName: '规格',
          valueName: '路径',
        }"
        v-model="appParams.storages"
      ></input-arr> -->
      <input-arr
        :label="$i18n('productCenter.detail.components.appConfig.环境变量')"
        class="mt15"
        :isRequire="false"
        :options="{
          key: 'key',
          value: 'value',
          keyName: $i18n('productCenter.detail.components.appConfig.变量名'),
          valueName: $i18n('productCenter.detail.components.appConfig.变量值'),
        }"
        v-model="appParams.envs"
      ></input-arr>
      <input-arr
        :label="$i18n('productCenter.detail.components.appConfig.host映射')"
        class="mt15"
        :isRequire="false"
        :options="{
          key: 'ip',
          value: 'domain',
          keyName: $i18n('productCenter.detail.components.appConfig.IP地址'),
          valueName: $i18n('productCenter.detail.components.appConfig.域名'),
        }"
        v-model="appParams.hosts"
      ></input-arr>
      <input-box
        :label="$i18n('productCenter.detail.components.appConfig.服务端口')"
        v-model="appParams.appPort"
        class="mt15"
        type="int"
        ref="appPort"
      ></input-box>
      <input-box :label="$i18n('productCenter.detail.components.appConfig.镜像仓库')" class="mt15">
        <ui-select-el
          :placeholder="$i18n('productCenter.detail.components.appConfig.请选择')"
          v-model="appParams.codeRepoId"
          style="width: 100%"
          :disabled="true"
        >
          <ui-option
            :key="'key10' + index"
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in RepoTypes"
          ></ui-option>
        </ui-select-el>
      </input-box>

      <input-box
        :label="$i18n('productCenter.detail.components.appConfig.副本数量')"
        v-model="appParams.replicas"
        type="int"
        class="mt15"
        ref="replicas"
      ></input-box>
    </ui-card>
    <div class="mt20">
      <button class="bp-btn faas-btn-primary" @click="putApp">{{ $i18n('productCenter.detail.components.appConfig.保存') }}</button>
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

import uiUpload from "@/components/ui/uiploader.vue";
import inputBox from "./inputBox.vue";
import inputArr from "./inputArr.vue";
import bpui from "bpui.js";
import api from "@/api";

@Component({
  components: {
    uiUpload,
    inputBox,
    inputArr,
    bpInput: bpui.bpInput,
    bpSwitch: bpui.bpSwitch,
    bpRadio: bpui.bpRadio,
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
  healthSwitch = false;
  //   上传方式集合
  uploadTypes = [
    {
      value: 1,
      label: $i18n('productCenter.detail.components.appConfig.本地文件包上传'),
      disable: false,
    },
    {
      value: 2,
      label: $i18n('productCenter.detail.components.appConfig.指定git仓库'),
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
  showDns = true;

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
  _getClusterList() {
    api.app.getClusterList().then((result: any) => {
      this.clusterList = result;
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
    });
  }
  // 选择语言环境
  // chsoseRuntime(val: any) {
  //   console.log(val);
  //   let activeItemArr = this.runTimeList.filter((item: any) => {
  //     return item.id == val;
  //   });
  //   this._filterCPU(activeItemArr[0]);
  //   (this.appParams as any).limitCpu = "";
  //   (this.appParams as any).limitMem = "";
  // }
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
      (this.appParams as any).domains = [];
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
    (this.appParams as any).codeFileId = data.id;
    $UIToast({ type: "success", content: $i18n('productCenter.detail.components.appConfig.代码上传成功') });
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

  init() {
    this._getGroupList();
    this._getRuntimeList();
    this._getClusterList();
    this._getSemItemspecList();
    this._getClusterRepoList();
    this._getDnsList();
    this._getStorege((this.appParams as any).clusterId);
  }
  putApp() {
    api.app
      .putApp((this.appParams as any).appId, this.appParams)
      .then((result: any) => {
        $UIToast({ type: "success", content: $i18n('productCenter.detail.components.appConfig.修改成功！') });
        this.$emit("updataDetail", true);
      });
  }
  created() {
    this.init();
  }

  mounted() {
    console.log(this.$refs);
    (this.$refs.appPort as any).$el.getElementsByTagName("input")[0].value = (
      this.appParams as any
    ).appPort;
    (this.$refs.replicas as any).$el.getElementsByTagName("input")[0].value = (
      this.appParams as any
    ).replicas;
  }
}
</script>
