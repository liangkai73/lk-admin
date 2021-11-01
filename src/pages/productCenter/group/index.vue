<!--
/**
* Copyright (c) 2020 Copyright originforest All Rights Reserved.
* Author: lanck
* Date: 2020-11-30 16:48
* Desc: 产品中心-服务组
*/
 -->

<template>
  <content-view
    :gutter="false"
    class="faas-content pdGroup-content flex1"
    :title="$i18n('productCenter.group.index.服务组')"
  >
    <div class="flex_r_s" slot="titleLeft">
      <!-- <ui-select-el
        placeholder="选择分组"
        v-model="activeGroup"
        style="width: 150px; margin-left: 15px"
      >
        <ui-option
          :key="'key1' + index"
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in siteGroups"
        ></ui-option>
      </ui-select-el> -->
    </div>

    <!--dns table list-->
    <div class="prdcenter-body">
      <p>
        <button
          class="bp-btn faas-btn-primary"
          @click="handleOpen('group')"
          style="width: 120px"
        >
{{ $i18n('productCenter.group.index.新建分组') }}
        </button>
      </p>
      <!-- listView 2 -->
      <table class="faas-table-group mt30">
        <thead>
          <tr>
            <th width="15%">
              <span>{{ $i18n('productCenter.group.index.状态') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('productCenter.group.index.名称') }}</span>
            </th>
            <th width="15%">
              <span>{{ $i18n('productCenter.group.index.内存限制') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('productCenter.group.index.创建时间') }}</span>
            </th>
            <th width="20%">
              <span>{{ $i18n('productCenter.group.index.修改时间') }}</span>
            </th>
            <th width="10%">
              <span>{{ $i18n('productCenter.group.index.操作') }}</span>
            </th>
          </tr>
        </thead>
        <template v-if="siteGroups.length > 0">
          <tr
            :key="item.roleId"
            v-for="item in siteGroups"
            v-show="filterResource(item)"
            class="apps-ul-li"
            :class="[
              {
                active_group: item.id == activeGroup,
              },
            ]"
            @click="showDetail(item)"
          >
            <th>
              <span>{{ $i18n('productCenter.group.index.正常') }}</span>
            </th>
            <th>
              <span>{{ item.name }}</span>
            </th>
            <th>
              <span>2G</span>
            </th>
            <th>
              <span> 2021-4-18 16:04:50 </span>
            </th>
            <th>
              <span>2021-4-19 15:03:25</span>
            </th>
            <th>
              <button @click="linkTo('detail', { id: item.id })">
{{ $i18n('productCenter.group.index.查看详情') }}
              </button>
            </th>
          </tr>
        </template>
      </table>
      <!-- 分页 -->
      <template>
        <uiPagination
          :pageSize.sync="applistParams.pageSize"
          :total="applistParams.total"
          @current-change="querList"
          style="padding: 15px 10px"
          v-model="applistParams.pageNum"
        ></uiPagination>
      </template>

      <!-- 暂无数据 -->
      <ui-no-records v-show="siteGroups.length == 0" />
    </div>

    <!-- 新建分组 -->
    <ui-dialog class="dialog-box" v-model="triggerObj.group" :title="$i18n('productCenter.group.index.新建分组')">
      <div class="dialog-inner flex_c_s">
        <div class="line1" style="margin: 0"></div>
        <ui-row class="inner-item mt10" style="margin-top: 40px">
          <ui-col :span="24">
            <!-- <p>新建分组</p> -->
            <bp-input
              class="mt10"
              :placeholder="$i18n('productCenter.group.index.请输入组名')"
              v-model="groupParams.name"
            ></bp-input>
          </ui-col>
        </ui-row>
        <span class="flex1"></span>
        <div class="inner-footer flex_r_s">
          <span class="flex1"></span>
          <button
            class="bp-btn faas-btn-black"
            style="margin-right: 10px"
            @click="handleDlogClose('group')"
          >
{{ $i18n('productCenter.group.index.取消') }}
          </button>
          <button
            class="bp-btn faas-btn-primary"
            :disabled="!(groupParams.name.length > 0)"
            @click="handleSure('group')"
          >
{{ $i18n('productCenter.group.index.确定') }}
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
import uiPagination from "@/components/ui/uiPagination.vue";
import uiDialog from "@/components/ui/uiDialogView.vue";
import bpui from "bpui.js";
import api from "@/api";
import CPUDashboardBlock from "./components/CPUDashboardBlock.vue";
import MemDashboardBlock from "./components/MemDashboardBlock.vue";
import ConcurrentDashboardBlock from "./components/ConcurrentDashboardBlock.vue";
import ActivityDashboardBlock from "./components/ActivityDashboardBlock.vue";
import CostDashboardBlock from "./components/CostDashboardBlock.vue";

@Component({
  components: {
    contentView,
    uiPagination,
    uiDialog,
    bpInput: bpui.bpInput,
    CPUDashboardBlock,
    MemDashboardBlock,
    ConcurrentDashboardBlock,
    ActivityDashboardBlock,
    CostDashboardBlock,
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

  filterStr = "";

  pageDta = {
    pageNum: 1,
    pageSize: 20,
    pages: 5,
    total: 85,
  };

  dialogShow = false;

  triggerObj: any = {
    detail: false, // siderView
    addSite: false, // dialog
    group: false, // 新建分组 dialog
  };

  getAppParams = {};
  applistParams = {
    pageNum: 1,
    pageSize: 20,
    total: 1,
  };
  applist = [];
  groupParams = {
    name: "",
  };

  activeGroup: any = {};
  siteGroups: any = [];
  total_app = 0;
  //
  // computed.
  // get demo() { return xxxx; }

  //
  // watch.
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  //

  handleChoseCp() {
    // this.changeDialog(true);
  }
  handleDlogClose(key: any) {
    this.changeDialog(key, false);
  }
  handleSure(str?: string) {
    if (str == "group") {
      this.addAppgroup().then((result: any) => {
        this.groupParams.name = "";
        $UIToast({ type: "success", content: $i18n('productCenter.group.index.分组出创建成功') });
        this.changeDialog("group", false);
        this._getGrouplist();
        // 初始化
      });
    }
  }
  handleOpen(str: string) {
    if (str == "app") {
      this.changeDialog("addSite", true);
    } else if (str == "group") {
      this.changeDialog("group", true);
    }
  }
  changeDialog(key: string, bl: boolean) {
    this.triggerObj[key] = bl;
  }

  addNewSite() {}
  // 新建app分组
  addAppgroup() {
    return api.app.postCatalog(this.groupParams).then((result: any) => {
      return Promise.resolve(result);
    });
  }

  querList(e: any) {
    this.applistParams.pageNum = e;
    this._getGrouplist();
  }
  // 过滤list
  filterResource(obj: any) {
    if (obj.name.indexOf(this.filterStr) >= 0) {
      return true;
    }
    return false;
  }
  handleApp() {
    this.$navbar.push({
      path: "/productCenter",
    });
  }

  // 获取应用列表
  // _getApplist() {
  //   let params = this.applistParams;
  //   api.app.getApplist(params).then((result: any) => {
  //     this.applist = result.list;
  //   });
  // }
  // 刷新列表
  updateList() {
    // this._getApplist();
    this.$timer.setTimeout(() => {
      this.changeDialog("addSite", false);
    }, 500);
  }
  // 获取所有分组
  // 获取分组列表
  _getGrouplist() {
    api.app.getCatalog().then((result: any) => {
      this.siteGroups = result;
      this.activeGroup = this.siteGroups[0].id;
    });
  }
  //
  showDetail(item: any) {
    this.activeGroup = item.id;
  }
  linkTo(url: string, query: object) {
    if (url == "detail") {
      this.$navbar.push({
        path: "detail",
        query,
      });
    }
  }

  // lifecycle hook.
  constructor() {
    super();
  }
  created() {
    // this._getApplist();
    this._getGrouplist();
  }
  mounted() {
    api.app.getApplist({ pageNum: 1, pageSize: 99999 }).then((result: any) => {
      this.total_app = result.total;
    });
  }
}
</script>

<style lang="scss">
@import "@/styles/var/_handle.scss";

.pdGroup-content {
  min-width: 1112px;
  .prdcenter-head-tools {
    margin-top: 20px;
  }
  .apps-ul-li {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      background: #e1e1e1;
    }
  }
  .active_group {
    // @include background_color('bg_color4')
  }
  .icon-box {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #8791a6;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    i {
      font-size: 16px;
    }
  }
  .active_icon {
    background: #8791a6;
    color: #fff;
  }
  .prdcenter-body {
    .prdcenter-item {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
    .faas-table-group {
      width: 100%;
      background: #fff;

      th {
        text-align: left;
      }
    }
  }
  .dialog-box {
    .bp-dialog__main {
      padding-top: 0px;
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
  .overview-head-items {
    width: calc(100% - 30px);
    padding: 0px;
    margin: 0 0 0 10px;
    height: 90px;

    .overview-head-item {
      height: 100%;
      cursor: pointer;
      /*border-right: 1px solid #e5e6ec;*/
      background: transparent;
      transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
      position: relative;
      &:last-child {
        border-right: none;
      }
      &:hover {
        background: #f9f9f9;
      }
      b {
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 1px;
        font-weight: 500;
      }
      &:after {
        content: "";
        border-right: 1px solid #e5e6ec;
        height: calc(100% - 30px);
        position: absolute;
        right: 0px;
      }
      &:nth-child(4) {
        &:after {
          height: 0px;
        }
      }

      .overview-head-item__count {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 1px;
        user-select: none;
      }

      .overview-head-item__title {
        display: flex;
        align-items: center;
        height: 28px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: 5px;
        color: #000000;
        user-select: none;

        i {
          margin-right: 5px;
        }
      }
    }
  }
  .overview-body-items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
}
</style>
