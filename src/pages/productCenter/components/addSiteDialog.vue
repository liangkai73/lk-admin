<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-07 14:44
* Desc: 新建web服务弹窗
*/
 -->
 <style lang='scss'>
.site-dialog-box {
  .bp-dialog__main {
    padding-top: 0px;
  }
  .inner-step {
    padding: 15px;
  }
  .ui-step-li {
    min-width: 150px !important;
  }
  .inner-area-items {
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 5px;
    .items-p {
      margin-bottom: 10px;
    }
    .bp-input {
      background: #e5e5e5;
    }
    .el-input__inner {
      background: #e5e5e5;
      border-radius: 0;
    }
    .loacal-uplod {
      margin-top: 20px;
      width: 100%;
      height: 200px;
      background: #e5e5e5;
    }
    //  reset
    .bp-input {
      margin: 0;
    }
  }
  .dialog-content {
    width: 520px;
    height: 600px;
    text-align: left;
    justify-content: start;
  }
}
</style>

<template>
  <ui-dialog
    class="site-dialog-box"
    v-model="dialogStatus"
    :title="$i18n('productCenter.components.addSiteDialog.新建容器服务')"
  >
    <div class="dialog-content flex_c_s">
      <div class="line1" style="margin: 0"></div>
      <div class="inner-step mt20 flex_r_c">
        <ui-step :active="stepNum" :stepArr="stepArr"></ui-step>
      </div>
      <!-- dialog-page0-->
      <div class="inner-area-items" v-if="stepNum == 0">
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.web服务名称') }}</p>
        <bp-input
          class="items-input"
          :placeholder="$i18n('productCenter.components.addSiteDialog.请输入web服务名称')"
          v-model="addsiteParams.name"
        ></bp-input>
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.应用描述') }}</p>
        <bp-input
          class="items-input"
          :placeholder="$i18n('productCenter.components.addSiteDialog.请输入应用描述')"
          v-model="addsiteParams.description"
        ></bp-input>
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.版本号') }}</p>
        <bp-input
          class="items-input"
          :placeholder="$i18n('productCenter.components.addSiteDialog.请输入应用版本号')"
          v-model="addsiteParams.version"
        ></bp-input>
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.所属分组') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.catalogId"
          style="width: 100%"
        >
          <ui-option
            :key="'key1' + index"
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in siteGroups"
          ></ui-option>
        </ui-select-el>
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.运行语言环境') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.runtimeId"
          style="width: 100%"
          @change="chsoseRuntime"
        >
          <ui-option
            :key="'key2' + index"
            :label="item.runtime"
            :value="item.id"
            v-for="(item, index) in runTimeList"
          ></ui-option>
        </ui-select-el>
      </div>
      <!-- dialog-page1 -->
      <div class="inner-area-items" v-if="stepNum == 1">
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.上传方式') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams._uploadType"
          style="width: 100%"
        >
          <ui-option
            :key="'key3' + index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disable"
            v-for="(item, index) in uploadTypes"
          ></ui-option>
        </ui-select-el>
        <!-- page1 - 本地上传 -->
        <template v-if="addsiteParams._uploadType == 1">
          <div class="loacal-uplod flex_c_c">
            <template v-if="addsiteParams.codeFileId.length > 0">
              <div class="flex_c_c">
                <bp-icon
                  name="checked"
                  style="font-size: 35px; color: #0acd7f"
                ></bp-icon>
                <p class="mt10 font18">{{ $i18n('productCenter.components.addSiteDialog.上传成功！') }}</p>
                <p class="mt10"></p>
                <button class="bp-btn faas-btn-primary" @click="removeFile">
{{ $i18n('productCenter.components.addSiteDialog.重新上传') }}
                </button>
              </div>
            </template>
            <template v-else>
              <ui-upload @uploadSuccess="uploadSuccess">
                <div class="flex_c_c">
                  <bp-icon
                    name="upload1"
                    style="font-size: 50px; margin-bottom: 5px; color: #aaa"
                  ></bp-icon>
                  <button class="bp-btn faas-btn-primary">{{ $i18n('productCenter.components.addSiteDialog.选择文件包') }}</button>
                </div>
              </ui-upload>
            </template>
          </div>
        </template>
        <!-- page2 - 指定git仓库 -->
        <template v-if="addsiteParams._uploadType == 2">
          <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.仓库地址') }}</p>
          <bp-input class="items-input" :placeholder="$i18n('productCenter.components.addSiteDialog.请输入仓库地址')"></bp-input>
          <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.获取权限') }}</p>
          <ui-select-el
            :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
            v-model="addsiteParams.limitType"
            style="width: 100%"
          >
            <ui-option
              :key="'key4' + index"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in limitTypes"
            ></ui-option>
          </ui-select-el>
          <!-- 权限方式1 -->
          <template v-if="addsiteParams.limitType == 1">
            <ui-row class="mt10">
              <ui-col :span="12">
                <bp-input :placeholder="$i18n('productCenter.components.addSiteDialog.请输入账号')"></bp-input>
              </ui-col>
              <ui-col :span="12">
                <bp-input :placeholder="$i18n('productCenter.components.addSiteDialog.请输入密码')" type="password"></bp-input>
              </ui-col>
            </ui-row>
          </template>
          <template v-if="addsiteParams.limitType == 2">
            <bp-input
              class="mt10"
              :rows="5"
              :placeholder="$i18n('productCenter.components.addSiteDialog.请输入')"
              type="textarea"
            ></bp-input>
          </template>
          <!-- 权限方式2 -->
          <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.分支') }}</p>
          <bp-input class="items-input" :placeholder="$i18n('productCenter.components.addSiteDialog.请输入分支')"></bp-input>
        </template>
      </div>
      <!-- dialog-page2 -->
      <div class="inner-area-items" v-if="stepNum == 2">
        <!-- profile -->
        <p class="flex_r_s mt20">
          <span>{{ $i18n('productCenter.components.addSiteDialog.环境变量') }}</span>
          <span class="flex1"></span>
          <span
            style="font-size: 30px; color: #a1a1a1; padding-right: 5px"
            class="cur_P"
            @click="addProfile"
            >+</span
          >
        </p>
        <div
          class="flex_r_s mt10"
          v-for="(item, index) in profileArr"
          :key="'key5' + index"
        >
          <bp-input
            :placeholder="$i18n('productCenter.components.addSiteDialog.键')"
            style="width: 260px"
            v-model="item.key"
          ></bp-input>
          <bp-input
            :placeholder="$i18n('productCenter.components.addSiteDialog.值')"
            v-model="item.value"
            style="width: 140px; margin-left: 20px"
          ></bp-input>
          <span class="flex1"></span>
          <bp-icon
            class="cur_P"
            name="close1"
            style="font-size: 14px; color: #a1a1a1; padding-right: 5px"
            @click="removeItem(profileArr, index)"
          ></bp-icon>
        </div>
        <!-- host -->
        <p class="flex_r_s mt20">
          <span>{{ $i18n('productCenter.components.addSiteDialog.host映射') }}</span>
          <span class="flex1"></span>
          <span
            style="font-size: 34px; color: #a1a1a1; padding-right: 5px"
            class="cur_P"
            @click="addHostArr"
            >+</span
          >
        </p>
        <div
          class="flex_r_s mt10"
          v-for="(item, index) in addsiteParams.hostResolves"
          :key="'key6' + index"
        >
          <bp-input
            style="width: 260px"
            placeholder="host"
            v-model="item.host"
          ></bp-input>
          <bp-input
            style="width: 140px; margin-left: 20px"
            :placeholder="$i18n('productCenter.components.addSiteDialog.ip地址')"
            v-model="item.ip"
          ></bp-input>
          <span class="flex1"></span>
          <bp-icon
            class="cur_P"
            name="close1"
            style="font-size: 14px; color: #a1a1a1; padding-right: 5px"
            @click="removeItem(addsiteParams.hostResolves, index)"
          ></bp-icon>
        </div>
        <!-- CPU -->
        <p class="items-p mt20">CPU</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.deploymentInfo.limitCpu"
          style="width: 100%"
        >
          <ui-option
            :key="'key7' + index"
            :label="item.optionName"
            :value="item.optionVal"
            v-for="(item, index) in cpuTypes"
          ></ui-option>
        </ui-select-el>
        <!-- MEM -->
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.内存') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.deploymentInfo.limitMem"
          style="width: 100%"
        >
          <ui-option
            :key="'key8' + index"
            :label="item.optionName"
            :value="item.optionVal"
            v-for="(item, index) in memTypes"
          ></ui-option>
        </ui-select-el>
        <!-- cluster -->
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.服务器') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.serverInfoId"
          style="width: 100%"
        >
          <ui-option
            :key="'key9' + index"
            :label="item.clusterType"
            :value="item.id"
            v-for="(item, index) in clusterList"
          ></ui-option>
        </ui-select-el>
        <!-- repo -->
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.镜像仓库') }}</p>
        <ui-select-el
          :placeholder="$i18n('productCenter.components.addSiteDialog.请选择')"
          v-model="addsiteParams.codeRepoId"
          style="width: 100%"
        >
          <ui-option
            :key="'key10' + index"
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in RepoTypes"
          ></ui-option>
        </ui-select-el>
        <!--  -->
        <p class="items-p mt20">{{ $i18n('productCenter.components.addSiteDialog.副本数量') }}</p>
        <bp-input
          class="items-input"
          :placeholder="$i18n('productCenter.components.addSiteDialog.请输入副本数量')"
          v-model="addsiteParams.replicas"
          type="int"
        ></bp-input>
      </div>
      <!-- dialog-page3 创建中 -->
      <div
        class="inner-area-items flex_c_c"
        style="height: 400px"
        v-if="stepNum == 10"
      >
        <bp-icon name="checked" style="font-size: 80px; margin: 15px"></bp-icon>
        <p style="font-size: 24px">{{ $i18n('productCenter.components.addSiteDialog.创建中') }}</p>
      </div>
      <!-- dialog-page3 创建中 -->
      <div
        class="inner-area-items flex_c_c"
        style="height: 400px"
        v-if="stepNum == 3"
      >
        <bp-icon
          name="checked"
          style="font-size: 80px; margin: 15px; color: #0acd7f"
        ></bp-icon>
        <p style="font-size: 24px">{{ $i18n('productCenter.components.addSiteDialog.成功') }}</p>
        <p class="mt10" style="font-size: 14px; color: #999999">
{{ $i18n('productCenter.components.addSiteDialog.您已成功新建容器服务') }}
        </p>
      </div>
      <!-- dialog-footer -->

      <span class="flex1"></span>
      <div class="inner-footer flex_r_s">
        <span class="flex1"></span>
        <button
          class="bp-btn faas-btn-black"
          style="margin-right: 10px"
          v-show="stepNum == 0"
          @click="
            () => {
              dialogStatus = false;
            }
          "
        >
{{ $i18n('productCenter.components.addSiteDialog.取消') }}
        </button>
        <button
          class="bp-btn faas-btn-black"
          style="margin-right: 10px"
          v-show="stepNum != 0 && stepNum != 3"
          @click="stepTo(-1)"
        >
{{ $i18n('productCenter.components.addSiteDialog.上一步') }}
        </button>
        <button
          class="bp-btn faas-btn-black"
          style="margin-right: 10px"
          v-show="stepNum != 3"
          @click="stepTo(1)"
        >
          {{ stepNum + 1 == 3 ? $i18n('productCenter.components.addSiteDialog.创建') : $i18n('productCenter.components.addSiteDialog.下一步') }}
        </button>
      </div>
    </div>
  </ui-dialog>
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

import uiDialog from "@/components/ui/uiDialogView.vue";
import uiStep from "@/components/ui/uiStep2.vue";
import uiUpload from "@/components/ui/uiploader.vue";
import bpui from "bpui.js";
import api from "@/api";
import { App } from "@/api/app/types";
import app from "@/api/app";

@Component({
  components: { uiDialog, bpInput: bpui.bpInput, uiStep, uiUpload },
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
  @Prop({ type: Boolean, default: false }) value!: boolean;

  //
  // data.
  // @Provide() demo:number = 1;
  stepNum = 2;
  stepArr = [
    { lable: $i18n('productCenter.components.addSiteDialog.web服务'), sum: 0 },
    { lable: $i18n('productCenter.components.addSiteDialog.上传代码包'), sum: 1 },
    { lable: $i18n('productCenter.components.addSiteDialog.配置环境'), sum: 2 },
  ];

  siteGroups = [];
  runTimeList = [];
  clusterList = [];
  //   select data-------
  //   上传方式集合
  uploadTypes = [
    {
      value: 1,
      label: $i18n('productCenter.components.addSiteDialog.本地文件包上传'),
      disable: false,
    },
    {
      value: 2,
      label: $i18n('productCenter.components.addSiteDialog.指定git仓库'),
      disable: true,
    },
  ];
  //
  limitTypes = [
    {
      value: 1,
      label: $i18n('productCenter.components.addSiteDialog.账号密码'),
    },
    {
      value: 2,
      label: $i18n('productCenter.components.addSiteDialog.SSH证书'),
    },
  ];
  cpuTypes = [
    {
      value: 1,
      label: "2C",
    },
    {
      value: 2,
      label: "4C",
    },
  ];
  memTypes = [
    {
      value: 1,
      label: "2GB",
    },
    {
      value: 2,
      label: "4GB",
    },
  ];
  RepoTypes = [];

  profileArr: any = [{ key: "", value: "" }]; // 环境变量容器

  // add site params
  addsiteParams = {
    actionType: "AppCreate", // 新增，默认
    name: "", // 应用名称
    description: "", // 应用描述
    version: "", // 版本号，每次更新必须是大于现有的app版本号，
    catalogId: "", // 应用分组，通过/app/catalog接口创建
    runtimeId: "", // 运行时ID-运行环境，通过接口/runtime/list 获取

    codeFileId: "", // 代码文件ID，上传后返回
    codeHash: "",
    cspUserId: "", // 不需要填写
    deploy: true, // 是否立即部署，目前仅支持立即

    codeRepoId: "", // 镜像仓库ID ，通过/app/repo/list 查询列表选择一个仓库
    hostResolves: [
      // host 映射
      {
        host: "",
        ip: "",
      },
    ],
    packageType: "image", // 默认
    profile: {
      // 环境变量 ，非必填
      env: {},
    },
    replicas: 1, // 默认副本数量 1
    serverInfoId: "", // 服务器ID，通过接口/sem/cluster/list
    deploymentInfo: {
      appPort: 8080,
      limitCpu: "",
      limitMem: "",
    },
    _uploadType: 1, // 上传方式
  };
  isNextDisable = false; // 时候禁用下一步骤

  //
  // computed.
  get dialogStatus() {
    return this.value;
  }
  set dialogStatus(val) {
    this.$emit("input", val);
    return;
  }

  stepTo(num: number) {
    if (this.stepNum > 0 && this.stepNum + num == 3) {
      // this._postApp().then((result: any) => {
      //   this.stepNum = this.stepNum + num;
      // });
    } else {
      this.stepNum = this.stepNum + num;
    }
  }
  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  filterParam(limitType: "page1Filter" | "page3Filter"): Promise<any> {
    let allFilters: any = {};
    allFilters.page1Filter = [
      "name",
      "namespace",
      "version",
      "catalogId",
      "runtimeId",
    ];
    allFilters.page3Filter = [];

    allFilters[limitType].forEach((key: string) => {
      if (!((this.addsiteParams as any)[key].length > 0)) {
        this.isNextDisable = true;
        return Promise.reject(`${key}不能为空`);
      }
    });

    this.isNextDisable = false;
    return Promise.resolve(true);
  }

  _postApp() {
    // this.profileArr.forEach((item: any) => {
    //   this.addsiteParams.profile.env[item.key] = item.value;
    // });
    // return api.app
    //   .postApp(this.addsiteParams)
    //   .then((result: any) => {
    //     this.$emit("updateList", result);
    //     return Promise.resolve(result);
    //   })
    //   .catch((err: any) => {
    //     return Promise.reject(err);
    //   });
  }

  //
  // lifecycle hook.
  constructor() {
    super();
  }

  // 关闭dialog
  handleDlogClose() {
    this.changeDialog(false);
  }
  // dialog =>click=>确定
  handleSure() {
    this.changeDialog(false);
  }
  // 修改dialog状态
  changeDialog(bl: boolean) {
    console.log(bl);
    this.dialogStatus = bl;
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
  //  添加环境变量
  addProfile() {
    this.profileArr.push({
      key: "",
      value: "",
    });
  }
  // 添加host
  addHostArr() {
    this.addsiteParams.hostResolves.push({
      host: "",
      ip: "",
    });
  }
  removeItem(arr: [], index: number) {
    arr.splice(index, 1);
  }
  // 上传成功回调
  uploadSuccess(data: any) {
    this.addsiteParams.codeFileId = data.id;
    $UIToast({ type: "success", content: $i18n('productCenter.components.addSiteDialog.代码上传成功') });
  }
  chsoseRuntime(val: any) {
    console.log(val);
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
  }
  // 移除上传
  removeFile() {
    this.addsiteParams.codeFileId = "";
  }

  init() {
    this.stepNum = 0;
    this._getGroupList();
    this._getRuntimeList();
    this._getClusterList();
    this._getSemItemspecList();
    this._getClusterRepoList();
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
