<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-04-02 16:14
* Desc: 展开侧边栏 - 权限管理
*/
 -->
 <style lang='scss'>
@import "@/styles/var/_handle.scss";

.site-inner {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  position: relative;
  .inner-site-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 24px;

    .list-item {
      min-height: 40px;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      @include border_bottom_color("border1");
      .cidrInput {
        border: 0;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
        background-color: transparent;
        &:focus-visible {
          border: 0;
          outline: none;
        }
      }
      .span-title {
        color: #999;
        user-select: none;
        display: inline-block;
        min-width: 170px;
      }
      .item-progress {
        margin: 20px 0;
        .el-progress {
          display: inline-block;
        }
      }
      .list-item-bottom {
        margin: 20px 0;
        width: 100%;
        .bp-input {
          overflow: hidden;
          background: #e5e5e5;
        }
        .bp-input__inner {
          height: 24px;
        }
      }
      .item-title-copy {
        padding: 0 5px;
        color: #1baaf5;
        cursor: pointer;
        flex-shrink: 0;
      }
    }
  }
  .site-list-bottom {
    height: 50px;
    width: 100%;
    padding: 0 24px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>

<template>
  <uiSiderView
    v-model="relVale"
    :title="data.name"
    :closeOnClickModal="true"
    :width="650"
    ref="siteSideView">
    <div class="site-inner">
      <div class="inner-site-list" v-if="data.appId">
        <p style="margin-top: 16px"></p>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.状态') }}</span>
          <bp-icon
            :name="filterStatus(data.status).icon"
            style="font-size: 18px"
            :style="{ color: filterStatus(data.status).color }"></bp-icon>
          <span
            class="pl10"
            :style="{ color: filterStatus(data.status).color }">{{ filterStatus(data.status).name }}</span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.所属分组') }}</span>

          <span> {{ data.catalogName }} </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.运行语言环境') }}</span>

          <span> {{ data.runtimeName }} </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">CPU</span>
          <span> 2Core </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.内存') }}</span>
          <span> 2G </span>
        </div>
        <div class="list-item flex_r_s">
          <p class="span-title" style="width: 150px">{{ $i18n('productCenter.components.sideViewDetail.外部访问地址') }}</p>
          <!-- <p
            class="bp-ellipsis"
            style="max-width: 350px"
            v-show="data.endpoint">
            http://{{ data.endpoint }}
          </p> -->
          <input type="text" class="cidrInput" v-show="data.endpoint" readonly :value="`http://${data.endpoint}`">
          <p
            v-show="data.endpoint"
            class="item-title-copy"
            @click="copyStr('http://' + data.endpoint)">
            {{ $i18n('productCenter.components.sideViewDetail.复制') }}
          </p>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.应用实例数') }}</span>
          <span> {{ data.replicas }} </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.Host映射') }}</span>
          <span> {{ data.hosts.length }} </span>
          <span class="flex1"></span>
          <p
            class="item-title-copy cur_P"
            v-show="data.hosts.length > 0"
            @click="
              () => {
                showHost = !showHost;
              }
            ">
            {{ showHost ? $i18n('productCenter.components.sideViewDetail.隐藏') : $i18n('productCenter.components.sideViewDetail.显示') }}
          </p>
        </div>
        <input-arr
          v-if="showHost"
          label=""
          class="mt5"
          preWidth="0"
          :isRequire="false"
          :readOnly="true"
          :options="{
            key: 'ip',
            value: 'domain',
            keyName: $i18n('productCenter.components.sideViewDetail.IP地址'),
            valueName: $i18n('productCenter.components.sideViewDetail.域名'),
          }"
          v-model="data.hosts"></input-arr>

        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.环境变量') }}</span>
          <span> {{ data.envs.length }} </span>
          <span class="flex1"></span>
          <p
            class="item-title-copy cur_P"
            v-show="data.envs.length > 0"
            @click="
              () => {
                showEnvs = !showEnvs;
              }
            ">
            {{ showEnvs ? $i18n('productCenter.components.sideViewDetail.隐藏') : $i18n('productCenter.components.sideViewDetail.显示') }}
          </p>
        </div>
        <input-arr
          v-if="showEnvs"
          label=""
          class="mt5"
          preWidth="0"
          :isRequire="false"
          :readOnly="true"
          :options="{
            key: 'key',
            value: 'value',
            keyName: $i18n('productCenter.components.sideViewDetail.变量名'),
            valueName: $i18n('productCenter.components.sideViewDetail.变量值'),
          }"
          v-model="data.envs"></input-arr>
        <div class="list-item flex_c_s">
          <div class="flex_r_s flex1">
            <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.代码包') }}</span>
            <span> {{ fileDta.name }} </span>
          </div>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.创建时间') }}</span>
          <span> {{ data.createTime | getDateStr(2) }} </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.修改时间') }}</span>
          <span> {{ data.updateTime | getDateStr(2) }} </span>
        </div>
        <div class="list-item flex_r_s">
          <span class="span-title">{{ $i18n('productCenter.components.sideViewDetail.描述') }}</span>
          <span> {{ data.description }}</span>
        </div>
      </div>
      <!-- footer -->
      <div class="site-list-bottom flex_r_s">
        <button class="bp-btn faas-btn-primary" @click="linkTo('detail')">
          {{ $i18n('productCenter.components.sideViewDetail.修改') }}
        </button>
        <button
          class="bp-btn faas-btn-black"
          style="margin-left: 20px"
          v-show="false">
          {{ $i18n('productCenter.components.sideViewDetail.停止') }}
        </button>
        <span class="flex1"></span>
        <button style="color: #ff3b30; font-size: 14px" @click="removeApp">
          {{ $i18n('productCenter.components.sideViewDetail.删除') }}
        </button>
      </div>
    </div>
  </uiSiderView>
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

import uiSiderView from "@/components/ui/uiSiderView.vue";
import bpui from "bpui.js";
import api from "@/api";
import { APP_STATUS } from "../libs";
import inputArr from "../detail/components/inputArr.vue";

@Component({
  components: {
    uiSiderView,
    bpInput: bpui.bpInput,
    bpCheckbox: bpui.bpCheckbox,
    inputArr,
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
  @Prop({ type: Boolean }) value!: boolean;
  @Prop({ type: Object }) data!: any;

  //
  // data.
  // @Provide() demo:number = 1;
  showSiderView = true;

  zippercentage = 0;
  siteGroups = [];
  runTimeList = [];
  clusterList = [];

  limitTypes = [
    {
      value: 1,
      label: $i18n('productCenter.components.sideViewDetail.账号密码'),
    },
    {
      value: 2,
      label: $i18n('productCenter.components.sideViewDetail.SSH证书'),
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
  updateParams: any = {};

  fileDta = {};
  showHost = false;
  showEnvs = false;
  //
  // computed.
  get relVale() {
    if (this.value) {
      this._getAppDeatil(this.data.appId);
    }
    return this.value;
  }
  set relVale(val) {
    this.$emit("input", val);
    // this.$emit("handleChangeView", val);
  }

  // computed.
  get statusColor() {
    let colorObj: any = {
      Running: "#29e271",
      Initial: "#1baaf5",
      Stopped: "#ffcc00",
      Failed: "#ff443a",
      Deleted: "#ccc",
      Deleting: "#ccc",
      default: "#ffcc00",
    };
    let colorKey = this.data.status;
    return colorObj[colorKey] || colorObj["default"];
  }

  //  背景颜色 -关联状态
  get bgColor() {
    let style = {
      background: this.statusColor,
    };
    return style;
  }
  // 字体颜色 - 关联状态
  get fontColor() {
    let style = {
      color: this.statusColor,
    };
    return style;
  }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
  filterStatus(status: string) {
    return (APP_STATUS as any)[status] || APP_STATUS.default;
  }
  copyStr(s: string) {
    var domUrl = document.createElement("input");
    domUrl.value = s;
    domUrl.id = "creatDom";
    document.body.appendChild(domUrl);
    domUrl.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    let creatDom: any = document.getElementById("creatDom");
    creatDom.parentNode.removeChild(creatDom);
    $UIToast({
      type: "success",
      content: $i18n('productCenter.components.sideViewDetail.复制成功，可粘贴'),
    });
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
  // 获取文件信息
  _getFileInfo(fileId: string) {
    api.app.getFileInfo(fileId).then((result: any) => {
      this.fileDta = result;
    });
  }
  // 获取APP详情
  _getAppDeatil(id: string) {
    return api.app.getApp(id).then((result: any) => {
      this.updateParams = Object.assign(this.updateParams, result);
      return Promise.resolve(this.updateParams);
    });
  }
  // 删除APP
  removeApp() {
    this.$UIConfirm({
      content: $i18n('productCenter.components.sideViewDetail.确认要删除该应用?'),
      title: $i18n('productCenter.components.sideViewDetail.应用管理')
    })
      .then((e) => {
        this.$UIConfirmHide();

        api.app.removeApp(this.data.appId).then((data: any) => {
          this.$emit("updateList", true);
          $UIToast({
            type: "success",
            content: $i18n('productCenter.components.sideViewDetail.删除成功'),
          });
          (this.$refs.siteSideView as any).relVal = false;
        });
      })
      .catch(() => { });
  }
  // 跳转
  linkTo(url: string) {
    if (url == "detail") {
      this.$navbar.push({
        path: "/productCenter/detail",
        query: { id: this.data.appId },
      });
    }
  }

  init() {
    this._getAppDeatil(this.data.appId).then((data: any) => {
      this._getFileInfo(this.data.codeFileId);
    });
    this._getGroupList();
    this._getRuntimeList();
    this._getClusterList();
    this._getSemItemspecList();
    this._getClusterRepoList();
  }
  //
  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    this.init();
  }
  mounted() { }
}
</script>
