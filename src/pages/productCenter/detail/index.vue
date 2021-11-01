<!--
/**
* Copyright (c) 2021 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2021-06-11 10:48
* Desc: 应用详情
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content app-deatil"
    :title="updateParams.name"
    :showBack="true">
    <!-- head table  -->
    <div class="detail-head-table mt20">
      <table class="collapse">
        <thead>
          <tr>
            <th width="33%">{{ $i18n('productCenter.detail.index.状态') }}</th>
            <th width="33%">{{ $i18n('productCenter.detail.index.创建时间') }}</th>
            <th width="33%">{{ $i18n('productCenter.detail.index.修改时间') }}</th>
          </tr>
        </thead>
        <tr>
          <th>
            <bp-icon
              :name="filterStatus(updateParams.status).icon"
              style="font-size: 18px"
              :style="{ color: filterStatus(updateParams.status).color }"></bp-icon>
            <span
              class="pl10"
              :style="{ color: filterStatus(updateParams.status).color }">{{ filterStatus(updateParams.status).name }}</span>
          </th>
          <th>
            {{ updateParams.createTime | getDateStr(2) }}
          </th>
          <th>
            {{ updateParams.updateTime | getDateStr(2) }}
          </th>
        </tr>
      </table>
      <table>
        <thead>
          <tr>
            <th width="33%">{{ $i18n('productCenter.detail.index.外部访问地址') }}</th>
            <th colspan="2">{{ $i18n('productCenter.detail.index.备注') }}</th>
          </tr>
        </thead>
        <tr>
          <th width="33%">
            <div class="flexDiv">
              <input type="text" class="cidrInput" v-show="updateParams.endpoint" readonly :value="`http://${updateParams.endpoint}`">
              <button
                class="item-title-copy"
                v-show="updateParams.endpoint"
                @click="copyStr('http://' + updateParams.endpoint)">
                <bp-icon name="copyLink"></bp-icon>
              </button>
            </div>

          </th>
          <th  colspan="2">
            <div class="flex_r_s">
              <p style="max-width: 85%">
                {{ updateParams.description }}
              </p>
              <button class="item-title-copy">
                <bp-icon name="edit" @click="handleOpen('desc')"></bp-icon>
              </button>
            </div>
          </th>
        </tr>
      </table>
    </div>
    <!-- tabs -->
    <uiTabs
      :data="tabsData"
      v-model="tabsValue"
      @handleClick="changeView"></uiTabs>
    <p class="mt10"></p>
    <!-- tab-page1 -->
    <appInfo
      :updateParams.sync="updateParams"
      v-if="tabsValue == 1 && updateParams.appId"
      @updataDetail="_getAppDeatil"></appInfo>
    <!-- tab-page2 -->
    <appConfig
      :updateParams.sync="updateParams"
      v-if="tabsValue == 2 && updateParams.appId"
      @updataDetail="_getAppDeatil"></appConfig>
    <!-- tab-page3 -->
    <appConsole
      :updateParams="updateParams"
      :appId="updateParams.appId"
      v-if="tabsValue == 3 && updateParams.appId"></appConsole>
    <!-- tab-page4 -->
    <appWatch
      :updateParams="updateParams"
      :appId="updateParams.appId"
      v-if="tabsValue == 4 && updateParams.appId"></appWatch>
    <!-- 新建分组 -->
    <ui-dialog class="dialog-box" v-model="triggerObj.desc" :title="$i18n('productCenter.detail.index.修改备注')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 80px">
          <ui-col :span="24">
            <bp-input
              class="mt10 inner-input"
              :placeholder="$i18n('productCenter.detail.index.请输入备注')"
              v-model="updateParams.description"></bp-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose('desc')">
            {{ $i18n('productCenter.detail.index.取消') }}
          </button>
          <button class="bp-btn faas-btn-primary" @click="handleSure('desc')">
            {{ $i18n('productCenter.detail.index.确定') }}
          </button>
        </div>
      </div>
    </ui-dialog>
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
import upload from "@/components/ui/uiploader.vue";
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import uiTabs from "@/components/ui/uiTabs.vue";
import api from "@/api";
import bpui from "bpui.js";
import formInput from "@/pages/cloudProvider/container/components/formeInput.vue"

// libs 支持
import { APP_STATUS } from "../libs";
// 逻辑组件
import appConfig from "./components/appConfig.vue";
import appConsole from "./components/appConsole.vue";
import appInfo from "./components/appInfo.vue";
import appWatch from "./components/appWatch.vue";

@Component({
  components: {
    contentView,
    upload,
    uiPagination,
    uiDialog,
    uiTabs,
    appConfig,
    appConsole,
    appInfo,
    appWatch,
    formInput,
    bpInput: bpui.bpInput,
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
  // @Provide() demo:number = 1;
  viewType: "edit" | "readonly" = "readonly";
  appParams = {};
  updateParams: any = {};
  tabsValue = 1;
  tabsData = [
    { title: $i18n('productCenter.detail.index.基本信息'), value: 1 },
    { title: $i18n('productCenter.detail.index.设置'), value: 2 },
    { title: $i18n('productCenter.detail.index.日志'), value: 3 },
    { title: $i18n('productCenter.detail.index.监控'), value: 4 },
  ];

  triggerObj: any = {
    desc: false, // siderView
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

  // 过滤状态
  filterStatus(status: string) {
    return (APP_STATUS as any)[status] || APP_STATUS.default;
  }
  changeView(e: any) { }
  // 获取APP详情
  _getAppDeatil() {
    let query: any = this.$route.query;
    let id = query.id;
    api.app.getApp(id).then((result: any) => {
      this.updateParams = result;
    });
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
      content: $i18n('productCenter.detail.index.复制成功，可粘贴'),
    });
  }

  handleDlogClose(key: any) {
    this.changeDialog(key, false);
  }
  changeDialog(key: string, bl: boolean) {
    this.triggerObj[key] = bl;
  }
  putApp() {
    return api.app
      .putApp((this.updateParams as any).appId, this.updateParams)
      .then((result: any) => {
        $UIToast({ type: "success", content: $i18n('productCenter.detail.index.修改成功！') });
        return Promise.resolve(true);
      });
  }
  handleSure(str?: string) {
    if (str == "desc") {
      this.putApp().then((result: any) => {
        this.changeDialog("desc", false);
      });
    }
  }
  handleOpen(str: string) {
    if (str == "desc") {
      this.changeDialog("desc", true);
    }
  }

  init() {
    this._getAppDeatil();
  }
  created() {
    this.init();
  }
  mounted() { }
}
</script>
<style lang='scss' scoped>
.collapse{
  border-collapse:collapse;
}

.flexDiv {
  display: flex;
  align-items: center;

  .cidrInput {
    border: 0;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    background-color: transparent;
    &:focus-visible{
      border: 0;
      outline: none;
    }
    &:-moz-focusring{
      border: 0;
      outline: none;
    }
  }
}
.app-deatil {
  .detail-head-table {
    // margin-bottom: 40px;
    table {
      width: 100%;
      th {
        text-align: left;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px;
        font-weight: normal;
      }
      thead {
        th {
          text-align: left;
          color: rgba(0, 0, 0, 0.45);
        }
      }
      tr {
        min-height: 30px;
      }
    }
    // reset
    .bp-input {
      margin: 0;
      .bp-input__inner {
        padding: 0;
      }
    }
  }
  .dialog-inner {
    width: 500px;
    height: 240px;
    text-align: left;
    justify-content: start;
    .inner-title {
      width: 100%;
    }
    .inner-item {
      p {
        padding-left: 3px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .inner-input {
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
